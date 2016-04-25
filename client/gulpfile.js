var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config.js');
var webpackBuildConfig = require('./webpack.build.config.js');

gulp.task('webpack_dev', function(callback) {

  webpack(webpackConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({}));
    callback();
  });
});

gulp.task('webpack', function(callback) {

  webpack(webpackBuildConfig, function(err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({}));
    callback();
  });
});

gulp.task('build', ['webpack'], function() {
  return gulp.src('./index.js')
  	.pipe(gulp.dest('build'))
  	.on('end', function() {
  		process.exit(1);
  	})
  	.on('error', function() {
  		process.exit(1);
  	});	
});

// 本地开发
gulp.task('default', ['webpack_dev']);
// 发布
gulp.task('pub', ['build']);