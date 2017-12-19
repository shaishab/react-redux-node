const gulp = require('gulp'),
  _ = require('lodash'),
  path = require('path'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence'),
  defaultAssets = require(path.join(__dirname, 'app/server/config/assets/all')),
  webpackStream = require('webpack-stream');

gulp.task('env:development', function() {
  process.env.NODE_ENV = 'development';
});

gulp.task('env:production', function() {
  process.env.NODE_ENV = 'production';
});

gulp.task('server', function() {
  return nodemon({
    script: 'app/server/server',
    ext: 'js,html',
    verbose: true,
    watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS)
  });
});

gulp.task('webpack', function() {
  return gulp.src('app/client/main.js')
    .pipe(webpackStream(require('./app/client/config/webpack.config')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch(['app/client/**/*.js', 'app/client/**/*.css'], ['webpack']);
});

gulp.task('default', function(done) {
  runSequence('env:development', 'webpack', 'server', 'watch', done);
});