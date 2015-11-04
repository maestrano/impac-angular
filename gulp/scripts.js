'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(path.join(conf.paths.src, '/**/*.coffee'))
    .pipe($.sourcemaps.init())
    .pipe($.coffeelint())
    .pipe($.coffeelint.reporter())
    .pipe($.coffee()).on('error', conf.errorHandler('CoffeeScript'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')))
    .pipe($.size())
});


// OLD: To remove

var coffeeFiles = [
    'src/services/**/*.coffee',
    'src/filters/**/*.coffee',
    'src/components/**/*.coffee'
]

// TODO::gulp-sourcemaps: stack trace and debugger not working in browser console.
// TODO::gulp-coffee: is stripping comments on compile, cant find options or
// alternative.
gulp.task('coffee-compile', ['clean'], function () {
  return gulp.src(coffeeFiles)
    .pipe($.coffee({bare: true}).on('error', conf.errorHandler('CoffeeScript')))
    // encapsulates components
    .pipe($.insert.wrap('(function () {\n\'use strict\';\n', '}).call(this);'))
    // Removes the prefixed extension from files names e.g name.directive.coffee.
    .pipe($.rename(function (path) {
      path.basename = path.basename.split('.')[0];
    }))
    .pipe(gulp.dest('tmp/scripts'));
});
