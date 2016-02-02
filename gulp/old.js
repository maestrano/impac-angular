// TODO: Break this out into multiple files and clean up.
var gulp = require('gulp'),
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
    // Source map support for Gulp.js
    sourcemaps = require('gulp-sourcemaps'),
    // Append or Prepend a string with gulp
    insert = require('gulp-insert'),
    // Strip-comments from code. Removes both line comments and/or block comments.
    strip = require('gulp-strip-comments'),

    // Javascript, stylesheet and webcomponent injection
    inject = require('gulp-inject'),
    // Node module for retreiving path name of a file
    path = require('path'),
    // // Minify css
    // minifyCss = require('gulp-minify-css'),
    // A ternary gulp plugin: conditionally control the flow of vinyl objects.
    gulpif = require('gulp-if'),
    // Create immutable, lazily-initialized pipeline.
    lazypipe = require('lazypipe'),
    // Runs a sequence of gulp tasks in the specified order.
    runSequence = require('run-sequence'),
    // Require package.json file
    pkg = require('../package.json');

// THIS VARIABLE IS SET BY RUNNING `NODE_ENV=value` before any task.
// e.g `NODE_ENV=production gulp build`
// OR just run `gulp build:dist`
var env = process.env.NODE_ENV || 'development';


/* ************************************ */
/* Build Tasks                          */
/* ************************************ */
// Source files for final dist build
var buildSourceFiles = [
    'src/impac-angular.prefix',
    'tmp/impac-angular.js',
    'src/impac-angular.suffix',
    'tmp/scripts/**/*.js',
    'lib/*.js'
  ];


// TODO: figure out a way to emit .on 'finish' with lazypipe() streams, for deleting tmp file, and running tests once build task has completely finished.
gulp.task('build-lib', ['coffee-compile', 'less-inject', 'less-concat', 'templates-concat'], function () {
  var isProd = (env === 'production');
  // lazy pipeline steps to be run on env=production
  var distChannel = lazypipe()
    .pipe(uglify)
    .pipe(strip)
    .pipe(rename, 'impac-angular.min.js')
    .pipe(gulp.dest, 'dist/');

  gulp.src(buildSourceFiles)
    .pipe(concat('impac-angular.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist/'))
    .pipe(gulpif(isProd, distChannel()));

  // note: uncomment bootstrap @import in impac-angular.less to run prod (build:dist).
  if (isProd) {
    // compile less into css and min.css for prod.
    runSequence('less-compile');
  }
});

// shortcut for setting env and running production pipes.
gulp.task('build-lib-dist', function () {
  env = 'production';
  runSequence('build-lib');
});

gulp.task('watch', function () {
  gulp.watch('src/**/*', ['build-lib']);
});

/* ************************************ */
/* Commands                             */
/* ************************************ */
gulp.task('start:watch', ['watch']);
// builds
gulp.task('build', ['build-lib']);
gulp.task('build:dist', ['build-lib-dist']);
// tests
gulp.task('test', ['test-dist-concatenated']);
gulp.task('test:dist', ['test-dist-minified']);
// individual build tasks
gulp.task('less:compile', ['less-compile']);
gulp.task('less:inject', ['less-inject']);
gulp.task('less:concat', ['less-concat']);
gulp.task('coffee:compile', ['coffee-compile']);
gulp.task('build:templates', ['templates-concat']);

gulp.task('default', ['build']);
