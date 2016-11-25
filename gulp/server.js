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

var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  routes = {
    '/bower_components': 'bower_components',
    '/dist': 'dist',
    '/assets': 'workspace/assets'
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

gulp.task('serve', ['workspace', 'watch'], function () {
  browserSyncInit(conf.paths.workspace);
});

// If rebuilding the library on every change is using too much cpu,
// or you want to manually build.
gulp.task('serve:noreload', ['workspace'], function () {
  browserSyncInit(conf.paths.workspace);
});
