/**
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */
'use strict';

var gulp = require('gulp'),
    wrench = require('wrench'),
    run = require('run-sequence');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('default', ['clean'], function (callback) {
  /*
   * Magic gulp async, allows for clean to fully finish deleting files
   * before starting the 'build' task.
   */
  run(['build'], function () {
    callback();
  });
});
