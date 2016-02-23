'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

// builds html templates into angular $templateCache setters in a new module's .run() function.
gulp.task('partials', function () {
  return gulp.src([
    path.join(conf.paths.src, '/components/**/*.html')
  ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      loose: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'impac.components.templates', // module name
      standalone: 'true', // creates a new module
      // TODO-XAUN: needed?
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
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

// Clean up  the tmp and build directory
gulp.task('clean', function (asyncCallback) {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], asyncCallback);
});

gulp.task('build', ['scripts', 'styles', 'partials'], function() {
  // Source files for final dist build
  var buildSourceFiles = [
    path.join(conf.paths.src, 'impac-angular.prefix'),
    path.join(conf.paths.src, 'impac-angular.module.js'),
    path.join(conf.paths.tmp, 'partials/*.js'),
    path.join(conf.paths.src, 'impac-angular.suffix'),
    path.join(conf.paths.tmp, 'scripts/**/*.js'),
    path.join(conf.paths.lib, '*.js'),
    path.join(conf.paths.dist, 'impac-angular.css'),
  ];

  var jsFilter = $.filter(['**/*', '!**/*.css'], { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });

  return gulp.src(buildSourceFiles)
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.concat('impac-angular.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(conf.paths.dist)) // Output impac-angular.js
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }))
    .pipe($.ngAnnotate())
    .pipe($.uglify()).on('error', conf.errorHandler('Uglify'))
    .pipe($.rename('impac-angular.min.js'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.minifyCss({ processImport: false, compatibility: 'ie8' }))
    .pipe($.rename('impac-angular.min.css'))
    .pipe(cssFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});
