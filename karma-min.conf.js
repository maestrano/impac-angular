// Karma configuration
// Generated on Thu Aug 21 2014 10:24:39 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      // 'karma-mocha',
      // 'karma-chai',
      // 'karma-sinon-chai',
      'karma-firefox-launcher',
      'karma-mocha-reporter',
      'karma-jasmine'
    ],

    // list of files / patterns to load in the browser
    files: [
      /* inject:bower */
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular-ui-sortable/sortable.js',
      'bower_components/angular-xeditable/dist/js/xeditable.js',
      'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/Chart.js/dist/Chart.js',
      'bower_components/lodash/lodash.js',
      'bower_components/angular-poller/angular-poller.min.js',
      'bower_components/moment/moment.js',
      'bower_components/pusher/dist/web/pusher.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/messageformat/messageformat.js',
      'bower_components/angular-translate-interpolation-messageformat/angular-translate-interpolation-messageformat.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/highcharts/highcharts.js',
      'bower_components/color/one-color-all.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-scenario/angular-scenario.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/AngularDevise/lib/devise.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/jasmine/lib/jasmine-core/jasmine.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      /* endinject */
      'dist/impac-angular.min.js',
      'src/**/*.spec.js',
      { pattern: 'dist/locales/*.json', watched: true, served: true, included: false }
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
