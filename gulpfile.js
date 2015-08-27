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
      'src/impacAngular/impacAngular.prefix',
      'src/impacAngular/impacAngular.js',
      'src/impacAngular/directives/**/*.js',
      'src/impacAngular/filters/**/*.js',
      'src/impacAngular/services/**/*.js',
      'src/impacAngular/impacAngular.suffix'
    ];

gulp.task('build', function() {
  gulp.src(sourceFiles)
    .pipe(concat('impac-angular.js'))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .pipe(rename('impac-angular.min.js'))
    .pipe(gulp.dest('./dist'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: true
  }, done);
});

gulp.task('test-debug', function (done) {
  karma.start({
    configFile: __dirname + '/karma-src.conf.js',
    singleRun: false,
    autoWatch: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-concatenated', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-concatenated.conf.js',
    singleRun: true
  }, done);
});

/**
 * Run test once and exit
 */
gulp.task('test-dist-minified', function (done) {
  karma.start({
    configFile: __dirname + '/karma-dist-minified.conf.js',
    singleRun: true
  }, done);
});

gulp.task('templates', function () {
  return gulp.src('src/impacAngular/templates/**/*.html')
    .pipe(templates('templates.tmp', {
      // root: '/templates/',
      // module: pkg.name
      module: 'maestrano.analytics.templates'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('concat', ['templates'], function () {
  return gulp.src([pkg.main, 'templates.tmp'])
    .pipe(concat(pkg.name + '.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', ['concat'], function () {
  gulp.src('./*.tmp', {read: false})
    .pipe(clean());
});

gulp.task('default', ['test', 'build']);

gulp.task('dist',
  [
    'test',
    'test-dist-concatenated',
    'test-dist-minified',
    'templates',
    'concat',
    'clean'
  ]);

gulp.task('templates', ['templates', 'concat', 'clean']);




