var appRoot = 'src/';
var outputRoot = 'dist/';
var exportSrvRoot = 'export/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  css: appRoot + '**/*.css',
  scss: 'styles/scss/**/*.scss',
  sass: 'styles/scss/**/*.sass',
  style: 'styles/**/*.css',
  images: 'images/**/*.*',
  fonts: 'fonts/**/*.*',
  output: outputRoot,
  exportSrv: exportSrvRoot,
  doc: './doc',
  locale: 'locale/**/*.json',
  e2eSpecsSrc: 'test/e2e/src/**/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
