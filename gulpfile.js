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
    // Compile less to css.
    less = require('gulp-less'),
    path = require('path'),
    // minify css
    minifyCss = require('gulp-minify-css'),
    // promise library
    // Q = require('q'),
    pkg = require('./package.json');

/*
** Testing Tasks
** todo::test: write tests for gulp build processes.
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
var templateFiles = ['src/impac-angular/components/**/*.html'];
// builds html templates into angular $templateCache setters in a new module's .run() function.
gulp.task('templates', function () {
  return gulp.src(templateFiles)
    .pipe(templates('tmp/templates/templates.tmp', {
      standalone: true, // creates a new module
      module: 'impac.components.templates', // module name
      transformUrl: function (url) {
        // Removing nested directory urls generated from component template paths.
        return url.split('/').splice(-1, 1).join('');
      }
    }))
    .pipe(gulp.dest('.'));
});

// makes a copy of impac-angular.modules.js and concatinates templates.tmp into it.
gulp.task('templates:concat', ['templates'], function () {
  return gulp.src(['src/impac-angular/impac-angular.module.js', 'tmp/templates/templates.tmp'])
    .pipe(concat(pkg.name + '.js')) // output filename
    .pipe(gulp.dest('tmp/')); // output destination
});

/* **********************
** Build tasks        ***
** **********************/
    // Source files for final dist build
var buildSourceFiles = [
      'src/impac-angular/impac-angular.prefix',
      'tmp/impac-angular.js',
      'src/impac-angular/impac-angular.suffix',
      'tmp/scripts/**/*.js'
    ],
    // CoffeeScript file directories to be compiled before build.
    coffeeFiles = [
      'src/impac-angular/components/**/*.coffee',
      'src/impac-angular/services/**/*.coffee',
      'src/impac-angular/filters/**/*.coffee'
    ],
    lessFiles = [
      'src/impac-angular/stylesheets/analytics.less'
    ];

// compiles CoffeeScript files into JS, wraps each file in a self-invoking anonymous function,
// and writes the sourcemaps.
gulp.task('coffee', ['clean'], function () {
  return gulp.src(coffeeFiles)
    // .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(insert.wrap('(function () {\n\'use strict\';\n', '})();')) // encapsulates components
    // .pipe(sourcemaps.write())
    // Removes the prefixed extension from files names.
    .pipe(rename(function (path) {
      path.basename = path.basename.split('.')[0];
    }))
    .pipe(gulp.dest('tmp/scripts'));
});

// compiles less into css and adds a sourcemap file.
gulp.task('less', function () {
  return gulp.src(lessFiles)
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('build', ['coffee', 'less', 'templates:concat'], function () {
  var stream = gulp.src(buildSourceFiles)
    .pipe(concat('impac-angular.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(strip())
    .pipe(rename('impac-angular.min.js'))
    .pipe(gulp.dest('dist'));

  stream.on('end', function () {
    del(['tmp']);
  });
});

// cleans up tmp file created by 'templates' task.
gulp.task('clean', function (asyncCallback) {
  del(['tmp', './src/impac-angular/impac-angular.js'], asyncCallback);
});

gulp.task('watch', ['build'], function () {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['build']);
});

/* **********************
** Commands           ***
** **********************/
gulp.task('default', ['build']);
gulp.task('start:watch', ['watch']);
gulp.task('build:less', ['less']);
gulp.task('build:coffee', ['coffee']);
gulp.task('build:templates', ['templates:concat']);

