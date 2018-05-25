//
// This is a **fake** web worker (implemented in processes not threads)
// that is used to handle the cpu-bound elegant work flow.
// 
// This is a heavyweight way (because I persisted to use node.js ;-)). I have
// tried the lightweight way - webworker-thread, napajs. However, both of them
// did define a worse behavior of `require` than tiny-worker.
// 
// I will later replace tiny-worker with a lightweight way. Hope I could find
// a better and full solution. ;-)
// 
// PS. Because the JavaScript engine itself treats JavaScript single threaded,
// hence nearly every library who is devoted to making JavaScript capable of being
// multithread use a single engine isolate for each thread. And in result, the
// marshalling/unmarshalling of objects when transfering data between two engine
// instance becomes a great challenge.
//

const assert = require('assert');
const path = require('path');
const java = require("java");

// you have to use path, `require` is not well defined by tiny-worker
// web worker works in the root directory as the entry javascript file
const resources = require(path.resolve(__dirname, 'resources.js'));

// define protocols
onmessage = ev => {
  const { command, args } = ev.data;
  switch (command) {
  case 'run-elegant-workflow': postMessage(runElegantWorkflow(args)); break;
  default: assert(0);
  }
}

// append classpath
const libs = [
  resources.ELEGANTJarFile,
  resources.ELEGANTWebDir
];
libs.forEach(f => java.classpath.push(f));

// get ELEGANTRunner
const ELEGANTRunner 
  = java.import('simonlee.elegantweb.ELEGANTRunner');

// the elegant work flow
const runElegantWorkflow = ({ apk, models, d3Algo, platforms, verbose }) => {
  try {
    // 1. create an simonlee.elegantweb.ELEGANTRunner$ELEGANTInstance
    const elegantInstance = ELEGANTRunner.buildInstanceSync(apk,
      models, d3Algo, platforms, verbose);

    // 2. do analysis
    elegantInstance.analyseSync();

    // 3. return the results
    return {
      results: {
        inString: elegantInstance.getResultInStringSync()
      }
    };
  } catch (error) {
    return {
      error
    };
  }
};