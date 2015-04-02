'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json');

var rename = require('gulp-rename');

gulp.task('server:scripts:dev', ['server:scripts:lint', 'server:scripts:shared'], function() {
	
	return gulp.src(config.src.server.scripts)
    	.pipe(rename(config.dest.server.names.js))
    	.pipe(gulp.dest(config.dest.server.paths.js));

});

gulp.task('server:scripts:shared', function() {

	gulp.src(config.src.shared.scripts).pipe(gulp.dest('../server/distribution'));
	//gulp.src(config.src.shared.scripts)
    //	.pipe(gulp.dest('./assets'));

});