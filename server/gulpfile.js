'use strict';

var gulp = require('gulp');

require('require-dir')('gulp-tasks');

gulp.task('default', [
  'watch:server'
]);

gulp.task('dist', [
  'server:scripts:dist'
]);