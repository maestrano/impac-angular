'use strict';

var path = require('path');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'karma', 'run-sequence']
});

gulp.task('inject-deps', function () {
  var injectFiles = gulp.src(require('wiredep')({devDependencies: true}).js, { read: false });
  var injectOptions = {
    transform: function (filePath) {
      return '\'' + filePath.slice(filePath.indexOf('bower_components')) + '\',';
    },
    starttag: '/* inject:bower */',
    endtag: '/* endinject */',
    addRootSlash: false
  };
  return gulp.src([
    path.join(__dirname, '/../karma.conf.js'),
    path.join(__dirname, '/../karma-min.conf.js')
  ])
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(gulp.dest(path.join(__dirname, '/..')));
});

gulp.task('unit-tests', function (done) {
  $.karma.server.start({
    configFile: path.join(__dirname, '/../karma.conf.js'),
    singleRun: true
  }, done);
  $.util.log($.util.colors.yellow('[ STARTING UNIT TESTS ]'));
});

gulp.task('unit-tests-min', function (done) {
  $.karma.server.start({
    configFile: path.join(__dirname, '/../karma-min.conf.js'),
    singleRun: true
  }, done);
  $.util.log($.util.colors.yellow('[ STARTING UNIT TESTS ON MINIFIED FILES ]'));
});


gulp.task('test', function (cb) {
  $.runSequence('inject-deps', ['unit-tests', 'unit-tests-min'], cb);
});
