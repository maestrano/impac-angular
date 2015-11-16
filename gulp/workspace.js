/* ************************************ */
/* Workspace                            */
/* ************************************ */

var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject');

gulp.task('inject-bower', ['build-lib-dist'], function () {
  return gulp.src('workspace/index.html')
    .pipe(wiredep({}))
    .pipe(gulp.dest('workspace'));
});

gulp.task('workspace', ['inject-bower']);

