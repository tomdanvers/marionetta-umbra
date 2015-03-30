'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json');

var rename = require('gulp-rename');

gulp.task('server:scripts:dev', ['server:scripts:lint'], function() {
	console.log('SCRIPTS:DEV');

	return gulp.src(config.src.server.scripts)
    	.pipe(rename(config.dest.server.names.js))
    	.pipe(gulp.dest(config.dest.server.paths.js));

});