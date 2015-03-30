'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json')

var rename = require('gulp-rename');
var stylus = require('gulp-stylus');
var minifyCSS = require('gulp-minify-css');
var nib = require('nib');

gulp.task('client:styles:dist', function() {

    return gulp.src([config.src.client.styles])
    .pipe(stylus({
        'include css': true,
        use: nib(),
        compress: true
    }))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename(config.dest.client.names.css))
    .pipe(gulp.dest(config.dest.client.paths.css));

});