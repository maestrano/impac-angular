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
  gulp.watch('bower_components/**/*', ['workspace', browserSync.reload]);
  gulp.watch('src/**/*', ['build', browserSync.reload]);
  gulp.watch('workspace/**/*', function (event) {
    browserSync.reload(event.path);
  });
});
