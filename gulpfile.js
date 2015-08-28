var gulp = require('gulp'),
    // karma for gulp
    // karma = require('karma').server,
    // Concatenates and registers AngularJS templates in the $templateCache.
    templates = require('gulp-angular-templatecache'),
    // A gulp plugin for removing files and folders with support for multiple files & globs.
    del = require('del'),
    // Concatenates files
    concat = require('gulp-concat'),
    // Minifies files
    uglify = require('gulp-uglify'),
    // Renames files
    rename = require('gulp-rename'),
    // Add angularjs dependency injection annotations with ng-annotate
    ngAnnotate = require('gulp-ng-annotate'),
    // Gulp compiler for coffee
    coffee = require('gulp-coffee'),
    // Utility functions for gulp plugins
    gutil = require('gulp-util'),
    // Source map support for Gulp.js
    sourcemaps = require('gulp-sourcemaps'),
    // Append or Prepend a string with gulp
    insert = require('gulp-insert'),
    // Strip-comments from code. Removes both line comments and/or block comments.
    strip = require('gulp-strip-comments'),
    // promise library
    // Q = require('q'),
    // construct pipes of streams of events
    // es = require('event-stream'),
    pkg = require('./package.json');

/*
** Testing Tasks
*/
// // Run test once and exit
// gulp.task('test', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma-src.conf.js',
//     singleRun: true
//   }, done);
// });

// gulp.task('test-debug', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma-src.conf.js',
//     singleRun: false,
//     autoWatch: true
//   }, done);
// });

// // Run test once and exit
// gulp.task('test-dist-concatenated', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma-dist-concatenated.conf.js',
//     singleRun: true
//   }, done);
// });

// // Run test once and exit
// gulp.task('test-dist-minified', function (done) {
//   karma.start({
//     configFile: __dirname + '/karma-dist-minified.conf.js',
//     singleRun: true
//   }, done);
// });

/* **************************
** Template Caching Tasks ***
** *************************/
// Builds $templateCache code from each of the html files within the src directory,
// outputting it into a file named templates.tmp at the root destination.
gulp.task('templates', function () {
  return gulp.src('src/impac-angular/templates/**/*.html')
    .pipe(templates('tmp/templates/templates.tmp', {
      // root: '/templates/',
      module: 'maestrano.analytics.templates'
    }))
    .pipe(gulp.dest('.'));
});

// makes a copy of impac-angular.modules.js and concatinates templates.tmp into it.
gulp.task('templates:concat', ['templates'], function () {
  return gulp.src(['src/impac-angular/impac-angular.module.js', './tmp/templates/templates.tmp'])
    .pipe(concat(pkg.name + '.js')) // output filename
    .pipe(gulp.dest('./src/impac-angular/')); // output destination
});

/* **********************
** Build tasks        ***
** **********************/
    // Source files for final dist build
var buildSourceFiles = [
      'src/impac-angular/impac-angular.prefix',
      'src/impac-angular/impac-angular.js',
      'src/impac-angular/impac-angular.suffix',
      'tmp/scripts/**/*.js'
    ],
    // CoffeeScript file directories to be compiled before build.
    coffeeFiles = [
      'src/impac-angular/directives/**/*.js.coffee',
      'src/impac-angular/filters/**/*.js.coffee',
      'src/impac-angular/services/**/*.js.coffee',
    ];

// compiles CoffeeScript files into JS, wraps each file in a self-invoking anonymous function,
// and writes the sourcemaps.
gulp.task('compile-coffee', ['clean'], function () {
  gutil.log('running compile-coffee..');
  return gulp.src(coffeeFiles)
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(insert.wrap('(function () {\n', '})();')) // encapsulates components
    .pipe(sourcemaps.write())
    // Removes the double '.js' file extension which is created due to the current nameing
    // convention '.js.coffee' through the components.
    .pipe(rename(function (path) {
      path.basename = path.basename.split('.')[0];
    }))
    .pipe(gulp.dest('./tmp/scripts'));
});

gulp.task('build', ['compile-coffee', 'templates:concat'], function () {
  var stream = gulp.src(buildSourceFiles)
    .pipe(concat('impac-angular.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'))
    .pipe(strip())
    .pipe(uglify())
    .pipe(rename('impac-angular.min.js'))
    .pipe(gulp.dest('./dist'));

  stream.on('end', function () {
    del(['tmp', './src/impac-angular/impac-angular.js']);
  });
});

// cleans up tmp file created by 'templates' task.
gulp.task('clean', function (asyncCallback) {
  del(['tmp', './src/impac-angular/impac-angular.js'], asyncCallback);
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['build']);
});

/* **********************
** Commands           ***
** **********************/
gulp.task('build:dist', ['build']);


