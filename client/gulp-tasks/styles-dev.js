'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json')

var rename = require('gulp-rename');
var stylus = require('gulp-stylus');

gulp.task('client:styles:dev', function() {

    return gulp.src([config.src.client.styles])
    .pipe(stylus({
        'include css': true
    }))
    .pipe(rename(config.dest.client.names.css))
    .pipe(gulp.dest(config.dest.client.paths.css));

});