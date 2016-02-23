'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build', browserSync.reload]);
  gulp.watch('workspace/**/*', function (event) {
    browserSync.reload(event.path);
  });
});
