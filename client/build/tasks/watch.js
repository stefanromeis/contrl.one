var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

// outputs changes to files to the console
function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

// this task will watch for changes
// to js, html, and css files and call the
// reportChange method. Also, by depending on the
// serve task, it will instantiate a browserSync session
gulp.task('watch', ['serve'], function () {
  gulp.watch(paths.source, ['build-system', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.images, ['build-images', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.fonts, ['build-fonts', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.sass, ['build-css', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.scss, ['build-css', browserSync.reload]).on('change', reportChange);
  gulp.watch(paths.css, ['build-css']).on('change', reportChange);
  gulp.watch(paths.style, function () {
    return gulp.src(paths.style)
      .pipe(browserSync.stream());
  }).on('change', reportChange);
  gulp.watch(paths.locale, browserSync.reload).on('change', reportChange);
});
