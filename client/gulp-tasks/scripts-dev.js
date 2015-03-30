'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json')

var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('client:scripts:dev', ['client:scripts:lint'], function() {

    return browserify({
        debug: true,
        entries: [config.src.client.scripts],
        extensions: ['.hbs']
    })
    .bundle()
    .pipe(source(config.dest.client.names.js))
    .pipe(gulp.dest(config.dest.client.paths.js));

});