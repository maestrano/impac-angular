'use strict';

var gulp = require('gulp'),
    conf = require('./conf'),
    pkg = require('../package.json'),
    path = require('path'),
    del = require('del'),
    templates = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    coffee = require('gulp-coffee'),
    insert = require('gulp-insert'),
    strip = require('gulp-strip-comments'),
    less = require('gulp-less'),
    inject = require('gulp-inject'),
    gutil = require('gulp-util'),
    minifyCss = require('gulp-minify-css');

// builds html templates into angular $templateCache setters in a new module's .run() function.
gulp.task('templates', function () {
  return gulp.src([path.join(conf.paths.src, '/components/**/*.html')])
    .pipe(templates(path.join(conf.paths.tmp, '/templates/templates.tmp'), {
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

// concatinates modules, and templates into one file.
gulp.task('templates-modules-concat', ['templates'], function () {
  return gulp.src([
      path.join(conf.paths.src, '/impac-angular.module.js'),
      path.join(conf.paths.tmp, '/templates/templates.tmp')
    ])
    .pipe(concat(pkg.name + '.js')) // output filename
    .pipe(gulp.dest(conf.paths.tmp)); // output destination
});

// compiles coffee into js, and wraps each file in a closure.
gulp.task('coffee-compile', function () {
  return gulp.src([
      path.join(conf.paths.src, '/services/**/*.coffee'),
      path.join(conf.paths.src, '/filters/**/*.coffee'),
      path.join(conf.paths.src, '/components/**/*.coffee')
    ])
    .pipe(coffee({bare: true}).on('error', gutil.log))
    // encapsulates components
    .pipe(insert.wrap('(function () {\n\'use strict\';\n', '}).call(this);'))
    // Removes the prefixed extension from files names e.g name.directive.coffee.
    .pipe(rename(function (path) {
      path.basename = path.basename.split('.')[0];
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')));
});

// Dynamically injects @import's statements into src/ impac-angular.less file.
gulp.task('less-inject', function() {
  return gulp.src(path.join(conf.paths.src, '/impac-angular.less'))
    .pipe(inject(gulp.src([
        path.join(conf.paths.src, '/components/**/*.less')
      ], {
      read: false
    }), {
      starttag: '/* inject:imports */',
      endtag: '/* endinject */',
      transform: function (filepath) {
        return '@import "' + filepath.replace('/src/', '') + '";';
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/')));
});

gulp.task('less-compile', ['less-inject'], function () {
  return gulp.src(path.join(conf.paths.src, '/impac-angular.less'))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(rename(function (path) {
      path.basename = 'impac-angular';
    }))
    .pipe(gulp.dest(conf.paths.dist))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename(function (path) {
      path.basename = 'impac-angular';
      path.basename += '.min';
    }))
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('less-concat', function () {
  return gulp.src([
      path.join(conf.paths.src, '/stylesheets/variables.less'),
      path.join(conf.paths.src, '/stylesheets/mixins.less'),
      path.join(conf.paths.src, '/stylesheets/globals.less'),
      path.join(conf.paths.src, '/stylesheets/widget-master-styles.less'),
      path.join(conf.paths.src, '/components/**/*.less')
    ])
    .pipe(concat('impac-angular.less'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function (asyncCallback) {
  return del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], asyncCallback);
});

gulp.task('build', ['coffee-compile', 'less-inject', 'less-concat', 'templates-modules-concat', 'less-compile'], function () {
  gulp.src([
      path.join(conf.paths.src, '/impac-angular.prefix'),
      path.join(conf.paths.tmp, '/impac-angular.js'),
      path.join(conf.paths.src, '/impac-angular.suffix'),
      path.join(conf.paths.tmp, '/scripts/**/*.js'),
      'lib/*.js'
    ])
    .pipe(concat('impac-angular.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest(conf.paths.dist))
    .pipe(uglify())
    .pipe(strip())
    .pipe(rename('impac-angular.min.js'))
    .pipe(gulp.dest(conf.paths.dist));
});
