'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf');

var browserSync = require('browser-sync');

// TODO: make this watch task actually work.
gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build', browserSync.reload]);
  gulp.watch('workspace/**/*', function(event){
    browserSync.reload(event.path)
  });
});
