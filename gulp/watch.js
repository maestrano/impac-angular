'use strict';

var path = require('path'),
    gulp = require('gulp'),
    conf = require('./conf');

// TODO: make this watch task actually work.
gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build']);
});
