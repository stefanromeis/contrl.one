var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var compilerOptions = require('../babel-options');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');
var urlAdjuster = require('gulp-css-url-adjuster');
var cleanCSS = require('gulp-clean-css');


// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function() {
  return gulp.src(paths.source)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions.system())))
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function() {
  return gulp.src(paths.html)
    .pipe(changed(paths.output, {extension: '.html'}))
    .pipe(gulp.dest(paths.output));
});

// copies changed font files to the output directory
gulp.task('build-fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(changed(paths.output))
    .pipe(gulp.dest(paths.output + '/fonts'));
});

//copies changed image files to the output directory
gulp.task('build-images', function () {
  return gulp.src(paths.images)
    .pipe(changed(paths.output))
    .pipe(gulp.dest('./images'));
});

// compile sass to css with sourcemaps
gulp.task('build-css', function () {
    return gulp.src('./styles/scss/styles.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(urlAdjuster({
            append: '?version='+(Date.now()),
        }))
        .pipe(cleanCSS({compatibility: 'ie9'}))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.output));
});

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-fonts', 'build-images', 'build-html', 'build-css'],
    callback
  );
});
