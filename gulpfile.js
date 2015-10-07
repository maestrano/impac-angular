// TODO: Break this out into multiple files and clean up.
var gulp = require('gulp'),
    // karma for gulp
    karma = require('karma').server,
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
    // Javascript, stylesheet and webcomponent injection
    inject = require('gulp-inject'),
    // Node module for retreiving path name of a file
    path = require('path'),
    // Minify css
    minifyCss = require('gulp-minify-css'),
    // A ternary gulp plugin: conditionally control the flow of vinyl objects.
    gulpif = require('gulp-if'),
    // Create immutable, lazily-initialized pipeline.
    lazypipe = require('lazypipe'),
    // Runs a sequence of gulp tasks in the specified order.
    runSequence = require('run-sequence'),
    // Require package.json file
    pkg = require('./package.json');

// THIS VARIABLE IS SET BY RUNNING `NODE_ENV=value` before any task.
// e.g `NODE_ENV=production gulp build`
// OR just run `gulp build:dist`
var env = process.env.NODE_ENV || 'development';

/* ************************************ */
/* Testing Tasks                        */
/* ************************************ */
// run tests on concatinated and minified dist builds of impac-angular.
gulp.task('test-dist-concatenated', function (done) {
 karma.start({
   configFile: __dirname + '/karma-dist-concatenated.conf.js',
   singleRun: true
 }, done);
});

// run test on dist/impac-angular.min.js
gulp.task('test-dist-minified', function (done) {
 karma.start({
   configFile: __dirname + '/karma-dist-minified.conf.js',
   singleRun: true
 }, done);
});

/* ************************************ */
/* Template Caching Tasks               */
/* ************************************ */
var templateFiles = ['src/components/**/*.html'];
// builds html templates into angular $templateCache setters in a new module's .run() function.
gulp.task('templates', function () {
  return gulp.src(templateFiles)
    .pipe(templates('tmp/templates/templates.tmp', {
      standalone: true, // creates a new module
      module: 'impac.components.templates', // module name
      // Shorten component $templaceCache paths for simpler dynamic selection, and
      // cleaner includes.
      transformUrl: function (url) {
            // parent component e.g dashboard, widgets.
        var parentFolderName  = url.split('/').splice(0, 1),
            // component's template name.
            fileName          = url.split('/').splice(-1, 1);

        // if html file is a modal, return full path for semantic purposes.
        if (fileName[0].indexOf('.modal.') >= 0) {
          return url;
        }
        // e.g widgets/accounts-balance
        return parentFolderName + '/' + fileName;
      }
    }))
    .pipe(gulp.dest('.'));
});

// makes a copy of impac-angular.modules.js and concatinates templates.tmp into it.
gulp.task('templates-concat', ['templates'], function () {
  return gulp.src(['src/impac-angular.module.js', 'tmp/templates/templates.tmp'])
    .pipe(concat(pkg.name + '.js')) // output filename
    .pipe(gulp.dest('tmp/')); // output destination
});

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
    ],
    // CoffeeScript & Less file directories to be compiled before build.
    coffeeFiles = [
      'src/services/**/*.coffee',
      'src/filters/**/*.coffee',
      'src/components/**/*.coffee'
    ],
    lessFiles = [
      'src/components/**/*.less'
    ],
    mainLessFile = 'src/impac-angular.less';

// TODO::gulp-sourcemaps: stack trace and debugger not working in browser console.
// TODO::gulp-coffee: is stripping comments on compile, cant find options or
// alternative.
gulp.task('coffee-compile', ['clean'], function () {
  return gulp.src(coffeeFiles)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    // encapsulates components
    .pipe(insert.wrap('(function () {\n\'use strict\';\n', '}).call(this);'))
    // Removes the prefixed extension from files names e.g name.directive.coffee.
    .pipe(rename(function (path) {
      path.basename = path.basename.split('.')[0];
    }))
    .pipe(gulp.dest('tmp/scripts'));
});

// Dynamically injects @import's into the main .less file, allowing less files to be places
// around the app structure with the component page they apply to.
gulp.task('less-inject', function() {
  return gulp.src(mainLessFile)
    .pipe(inject(gulp.src(lessFiles, {
      read: false,
    }), {
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function (filepath) {
        return '@import "' + filepath.replace('/src/', '') + '";';
      }
    }))
    .pipe(gulp.dest('src/'));
});

gulp.task('less-compile', ['less:inject'], function () {
  return gulp.src(mainLessFile)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(rename(function (path) {
      path.basename = 'impac-angular';
    }))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(function (path) {
      path.basename = 'impac-angular';
      path.basename += '.min';
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('less-concat', function () {
  return gulp.src([
      './src/stylesheets/variables.less',
      './src/stylesheets/mixins.less',
      './src/stylesheets/globals.less',
      './src/stylesheets/widget-master-styles.less',
      './src/components/**/*.less'
    ])
    .pipe(concat('impac-angular.less'))
    .pipe(gulp.dest('./dist/'));
});

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

// cleans up tmp file created by 'templates' task.
gulp.task('clean', function (asyncCallback) {
  del(['tmp'], asyncCallback);
});

gulp.task('watch', function () {
  var tasks = [];
  env === 'production' ? tasks.push('build-lib-dist') : tasks.push('build-lib');
  gulp.watch(['src/**/*.js', 'src/**/*.html', 'src/**/*.less'], tasks);
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
