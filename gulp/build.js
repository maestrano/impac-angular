'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

// var $ = require('gulp-load-plugins')({
//   pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
// });
var $ = require('gulp-load-plugins')();


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
