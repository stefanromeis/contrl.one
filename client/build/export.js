// this file provides a list of unbundled files that
// need to be included when exporting the application
// for production.
module.exports = {
  'list': [
    'index.html',
    'config.js',
    'favicon.ico',
    'LICENSE',
    'jspm_packages/system.js',
    'jspm_packages/system-polyfills.js',
    'jspm_packages/system-csp-production.js',
    'styles/styles.css'
  ],
  // this section lists any jspm packages that have
  // unbundled resources that need to be exported.
  // these files are in versioned folders and thus
  // must be 'normalized' by jspm to get the proper
  // path.
  'normalize': [
    [
      // include font-awesome.css and its fonts files
      'font-awesome', [
        '/css/font-awesome.min.css',
        '/fonts/*'
      ]
    ], [
      // include bootstrap's font files
      'bootstrap', [
        '/fonts/*'
      ]
    ]
  ]
};

//module.exports = {
//  "list": [
//    "index.html",
//    "config.js",
//    "favicon.ico",
//    "LICENSE",
//    "jspm_packages/system.js",
//    "jspm_packages/system-polyfills.js",
//    "jspm_packages/system-csp-production.js",
//    "styles/styles.css",
//    "jspm_packages/npm/font-awesome@4.5.0/css/font-awesome.min.css",
//    "jspm_packages/npm/font-awesome@4.5.0/fonts/*",
//    "jspm_packages/github/github/fetch@0.11.0.js",
//    "jspm_packages/github/github/fetch@0.11.0/fetch.js",
//    "jspm_packages/github/twbs/bootstrap@3.3.6/fonts/*"
//  ]
//};
