// const fs = require('fs');
// const os = require('os');
// const path = require('path');
// const uuidv4 = require('uuid/v4');
// const util = require('util');
// const router = new require('koa-router')();
// const elegantDB = require('../dbs/elegant');

// // promisify fs
// const stat = util.promisify(fs.stat);
// const writeFile = util.promisify(fs.writeFile);

// // promisify pipe
// const pipe = (reader, writer) => {
//   reader.pipe(writer);

//   return new Promise((resolve, reject) => {
//     reader.on('end', () => resolve({ success: true, writer }));
//     reader.on('error', error => reject({ success: false, error, writer }));
//   });
// };

// router.post('/', async (ctx, next) => {
//   const { 
//     fields: { acpairs },
//     files: { apk }
//   } = ctx.request.body;

//   // save apk to a temp file
//   const tmpApkPath = `${path.join(os.tmpdir(), uuidv4())}.apk`;
//   // save acpairs to a temp file
//   const tmpModelsPath = `${path.join(os.tmpdir(), uuidv4())}.json`;

//   // create a reade stream
//   const apkReader = fs.createReadStream(apk.path);
//   // create a write stream
//   const apkWriter = fs.createWriteStream(tmpApkPath);

//   // pipe reader to writer, and save models
//   try {
//     await pipe(apkReader, apkWriter);
//     await writeFile(tmpModelsPath, acpairs);
//   } catch (e) {
//     ctx.throw(500, 'error: uploading apk', e);
//   }

//   try {
//     // get an instance and run it
//     let elegantInstance = elegantDB.get(
//       tmpApkPath, tmpModelsPath, 'd3.whitelist', false);
//     elegantInstance.analyse();
//     ctx.body = { 
//       resultInString: elegantInstance.getResultInString() 
//     };
//   } catch (e) {
//     ctx.throw(500, 'error: analysing apk', e);
//   }
// });

// module.exports = {
//   base: 'elegant',
//   router
// };


















const fs = require('fs');
const os = require('os');
const path = require('path');
const uuidv4 = require('uuid/v4');
const util = require('util');
const router = new require('koa-router')();
const elegantDB = require('../dbs/elegant');

// promisify fs
const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);

// promisify pipe
const pipe = (reader, writer) => {
  reader.pipe(writer);

  return new Promise((resolve, reject) => {
    reader.on('end', () => resolve({ success: true, writer }));
    reader.on('error', error => reject({ success: false, error, writer }));
  });
};

router.post('/', async (ctx, next) => {
  const { 
    fields: { acpairs, d3Algo },
    files: { apk }
  } = ctx.request.body;

  // save apk to a temp file
  const tmpApkPath = `${path.join(os.tmpdir(), uuidv4())}.apk`;
  // save acpairs to a temp file
  const tmpModelsPath = `${path.join(os.tmpdir(), uuidv4())}.json`;

  // create a reade stream
  const apkReader = fs.createReadStream(apk.path);
  // create a write stream
  const apkWriter = fs.createWriteStream(tmpApkPath);

  // pipe reader to writer, and save models
  try {
    await pipe(apkReader, apkWriter);
    await writeFile(tmpModelsPath, acpairs);
  } catch (e) {
    ctx.throw(500, 'error: uploading apk', e);
  }

  try {
    // get an instance and run it
    let elegantInstance = elegantDB.get(
      tmpApkPath, tmpModelsPath, d3Algo, false);
    let result = await elegantInstance.doAnalyse();
    ctx.body = { 
      resultInString: result.inString
    };
  } catch (e) {
    ctx.throw(500, 'error: analysing apk', e);
  }
});

module.exports = {
  base: 'elegant',
  router
};
