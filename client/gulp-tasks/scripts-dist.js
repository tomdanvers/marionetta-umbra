'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json');

var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var strip = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

gulp.task('client:scripts:dist', ['client:scripts:lint'], function() {

    return browserify({
        entries: [config.src.client.scripts],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(source(config.dest.client.names.js))
    .pipe(gulp.dest(config.dest.client.paths.js))
    .pipe(streamify(strip()))
    .pipe(streamify(uglify()))
    .pipe(rename(config.dest.client.names.jsmin))
    .pipe(gulp.dest(config.dest.client.paths.js));

});