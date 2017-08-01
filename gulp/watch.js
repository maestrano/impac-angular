/* ************************************ */
/* Watch                                */
/* ************************************ */
// TODO: update this watch task to be more granular. Rerun only the tasks needed to update the changes. Example, if a stylesheet is updates, rebuild `gulp styles` only.
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

gulp.task('watch', function () {
  gulp.watch('src/**/*', { interval: 1500 }, ['build', browserSync.reload]);
  gulp.watch('workspace/**/*', { interval: 1500 }, function (event) {
    browserSync.reload(event.path);
  });
});
