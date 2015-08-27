var gulp = require('gulp'),
    karma = require('karma').server,
    templates = require('gulp-angular-templatecache'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    ngAnnotate = require('gulp-ng-annotate'),
    pkg = require('./package.json'),
    sourceFiles = [
      'src/impac-angular/impac-angular.prefix',
      'src/impac-angular/impac-angular.js',
      'src/impac-angular/directives/**/*.js.coffee',
      'src/impac-angular/filters/**/*.js.coffee',
      'src/impac-angular/services/**/*.js.coffee',
      'src/impac-angular/impac-angular.suffix'
    ];

/*
** Testing Tasks
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
// Builds $templateCache code from each of the html files within the src directory,
// outputting it into a file named templates.tmp at the root destination.
gulp.task('templates', function () {
  return gulp.src('src/impac-angular/templates/**/*.html')
    .pipe(templates('templates.tmp', {
      // root: '/templates/',
      // module: pkg.name
      module: 'maestrano.analytics.templates'
    }))
    .pipe(gulp.dest('.'));
});

// makes a copy of impac-angular.modules.js and concatinates templates.tmp into it.
gulp.task('concat', ['templates'], function () {
  return gulp.src(['src/impac-angular/impac-angular.module.js', 'templates.tmp'])
    .pipe(concat(pkg.name + '.js')) // output filename
    .pipe(gulp.dest('./src/impac-angular/')); // output destination
});

// cleans up tmp file created by 'templates' task.
gulp.task('clean', ['concat'], function () {
  gulp.src('./*.tmp', {read: false})
    .pipe(clean());
});

/* **********************
** Build tasks        ***
** **********************/
gulp.task('build', ['clean'], function() {
  gulp.src(sourceFiles)
    .pipe(concat('impac-angular.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('impac-angular.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['build']);
});

/* **********************
** Commands           ***
** **********************/
gulp.task('default', ['templates', 'concat', 'clean', 'build']);
// gulp.task('foobar', ['build']);
// gulp.task('dist',
//   [
//     'test',
//     'test-dist-concatenated',
//     'test-dist-minified',
//     'templates',
//     'concat',
//     'clean'
//   ]);




