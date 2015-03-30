'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json');

var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var strip = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

gulp.task('server:scripts:dist', ['server:scripts:lint'], function() {

    return browserify({
        entries: [config.src.server.scripts],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(streamify(strip()))
    .pipe(streamify(uglify()))
    .pipe(rename(config.dest.server.names.jsmin))
    .pipe(gulp.dest(config.dest.server.paths.js));

});