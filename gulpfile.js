var gulp = require('gulp'),
watch      = require('gulp-watch'),
    concat     = require('gulp-concat'),
    mCSS       = require('gulp-minify-css'),
    uCSS 		= require('gulp-uncss'),
   notify     = require('gulp-notify'),
    uglify     = require('gulp-uglify'),
    order      = require('gulp-order'),
    clean      = require('gulp-cleanhtml'),
    mario      = require('gulp-plumber');



gulp.task('uCSS', function() {
	return gulp.src('dev/css/*.css')
// need  concatenaation of all styles required

					.pipe(concat('main.css'))
					.pipe(uCSS({
						html: ['index.html']}))
					.pipe(gulp.dest('./out'));					});


gulp.task('default', function() {
	return gulp.src('index.html')
				.pipe(notify())
});