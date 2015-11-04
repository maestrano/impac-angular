'use strict';

var path = require('path');
var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

// Compile less to css.
// var less = require('gulp-less');

var lessFiles = [
  'src/components/**/*.less'
],
mainLessFile = 'src/impac-angular.less';

// Dynamically injects @import's into the main .less file, allowing less files to be places
// around the app structure with the component page they apply to.
gulp.task('less-inject', function() {
  return gulp.src(mainLessFile)
    .pipe($.inject(gulp.src(lessFiles, {
      read: false
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
    .pipe($.less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe($.rename(function (path) {
      path.basename = 'impac-angular';
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.minifyCss({compatibility: 'ie8'}))
    .pipe($.rename(function (path) {
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
    .pipe($.concat('impac-angular.less'))
    .pipe(gulp.dest('./dist/'));
});
