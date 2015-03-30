'use strict';

var gulp = require('gulp');

require('require-dir')('gulp-tasks');

gulp.task('default', [
  'watch:client'
]);

gulp.task('dist', [
  'client:scripts:dist',
  'client:styles:dist'
]);