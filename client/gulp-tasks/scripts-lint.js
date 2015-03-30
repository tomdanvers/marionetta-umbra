'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json')

var jshint = require('gulp-jshint');

gulp.task('client:scripts:lint', function() {

    return gulp.src(config.src.client.lint)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

});