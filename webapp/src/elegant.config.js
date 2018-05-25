import React from 'react';

//
// base information
//
export const APP = {
  name: 'ELEGANT',
  description: `a tool used to locate fragmentation induced compatibility issues`,
  richDescription: `a tool us<u>e</u>d to <u>l</u>ocat<u>e</u> 
    fra<u>g</u>ment<u>a</u>tion i<u>n</u>duced compa<u>t</u>ibility issues`,
  author: {
    name: 'Simon Lee',
    index: 'https://github.com/Leetsong',
    email: 'leetsong.lc@gmail.com'
  }
};


// 
// introductions
// 
export const INTRODUCTIONS = [
  {
    title: 'FIC Issues Location',
    description: `FIC is short for <u>f</u>ragmentation <u>i</u>nduced <u>c</u>ompatibility 
      issues the <a src="https://www.android.com" target="_blank"> Android </a>
      ecosystem is severely suffering from. In the Android ecosystem, a developer cannot 
      exhaustively test all the various devices due to the numerous combinations of 
      different device models and operating system versions. With ELEGANT, an 
      developer can easily and automatically locate them.`,
    extra: <img 
              width="100%" 
              src="https://www.bleepstatic.com/content/hl-images/2015/11/10/android[1].png"
            />
  },
  {
    title: 'API-Context Pair Model',
    description: `<a href="http://home.cse.ust.hk/~lweiae/" target="_blank">API-Context Pair Model</a> is 
      a mechanism, proposed by L. Wei et al. in 2016, to detect and validate the FIC issues. 
      An <code>API-Context Pair</code> is a pair of <code>API</code> and <code>Context</code>, of 
      which, the <code>API</code> describes details of the api triggering a problem, and 
      the <code>Context</code> describes the context or environment at where a problem will be 
      triggered. ELEGANT uses API-Context Pair Model to locate FIC issues.`,
    extra: <img 
             width="100%" 
             src="https://www.bleepstatic.com/content/hl-images/2015/11/10/android[1].png"
           />
  },
  {
    title: 'Third Party Library Detection',
    description: `Third party libraries have been shown to make the Android ecosystem more vulnerable. 
      ELEGANT are capable of detecting third party libraries. Besides, some FIC issues happens in 
      them are not helpful to the developer, hence ELEGANT has the ability to eliminate them while
      doing locating with the sacrificing of efficiency.`,
    extra: <img 
             width="100%" 
             src="https://www.bleepstatic.com/content/hl-images/2015/11/10/android[1].png"
           />
  },
  {
    title: 'Call Site Tree and Call Chain',
    description: `ELEGANT constructs a call site tree while doing locating, and in the end can report the
      call chain of a specific API, to give developers more information and help do debug.`,
    extra: <img 
             width="100%" 
             src="https://www.bleepstatic.com/content/hl-images/2015/11/10/android[1].png"
           />
  }
];

//
// d3 algorithms
//  
export const D3ALGO = [
  {
    title: 'None',
    value: 'd3.none',
    description: 'Use no 3rd party library detection techniques. (However, android/java official classes will still be eliminated)',
    keywords: [ 'fast' ]
  },
  {
    title: 'Whitelist',
    value: 'd3.whitelist',
    description: 'The default 3rd party library detection technique. Fast and precise!',
    keywords: [ 'precies', 'fast' ]
  },
  {
    title: 'LibSout',
    value: 'd3.libscout',
    description: 'A more precise 3rd party library detection technique implemented by LibScout. Slow but more precise!',
    keywords: [ 'precise', 'slow' ],
    link: 'https://github.com/reddr/LibScout'
  }
];

// reversed index
D3ALGO.none = 0;
D3ALGO.whitelist = 1;
D3ALGO.libscout = 2;
D3ALGO.default = D3ALGO.whitelist;
