/* ************************************ */
/* Server                               */
/* ************************************ */
'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['browser-*']
});

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  routes = {
    '/bower_components': 'bower_components',
    '/dist': 'dist'
  };

  var server = {
    baseDir: baseDir,
    routes: routes
  };

  $.browserSync.instance = $.browserSync.init({
    port: 7001,
    startPath: '/',
    server: server,
    browser: browser,
    ui: {
      port: 7002
    }
  });
}

$.browserSync.use($.browserSyncSpa({
  selector: '[ng-app]'// Only needed for angular apps
}));

gulp.task('serve', ['build', 'watch'], function () {
  browserSyncInit(conf.paths.workspace);
});

// no live reload for when re-building on save is too consuming on your PC.
gulp.task('serve:noreload', ['build'], function () {
  browserSyncInit(conf.paths.workspace);
});
