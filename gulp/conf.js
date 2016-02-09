'use strict';
/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util'),
    workspaceSettings = require('../workspace/settings.json'),
    notify = require('gulp-notify');

/**
 *  Set impac-angular version here; selects versioned services and dist files.
 *  Node environment variable can be set by running `NODE_ENV=value` before any task.
 */
exports.version = process.env.NODE_ENV || workspaceSettings.version || '2';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
};


// exports.injectVersion = function(path) {
//   return path.replace(':version', ('v' + exports.version));
// };

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    notify.onError('Error: <%= err.toString() %>');
    this.emit('end');
  };
};
