'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    path = require('path'),
    inject = require('gulp-inject'),
    wiredep = require('wiredep').stream;

/**
 *  Builds and injects dependencies into workspace/index.html
 */
gulp.task('workspace', ['build'], function () {

  var injectFiles = gulp.src([
    path.join(conf.paths.dist, conf.injectVersion('/impac-angular.:version.js'))
  ], { read: false });

  var injectOptions = {
    transform: function (filepath) {
      return '<script src="..' + filepath + '"></script>';
    },
    starttag: '<!-- inject:impac-angular -->',
    endtag: '<!-- endinject -->'
  };

  return gulp.src('workspace/index.html')
    .pipe(wiredep({}))
    .pipe(inject(injectFiles, injectOptions))
    .pipe(gulp.dest('workspace'));
});
