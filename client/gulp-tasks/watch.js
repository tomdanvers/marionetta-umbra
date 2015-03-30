'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json')

var browserSync = require('browser-sync');

gulp.task('watch:client', ['client:styles:dev', 'client:scripts:dev'], function() {

    browserSync({
        files: config.sync.client.files,
        proxy: config.sync.client.proxy,
        browser: config.sync.browser,
        open: config.sync.open,
        watchOptions: {
            debounceDelay: 1000
        }
    });

    gulp.watch(config.src.client.watch.styles, {interval: 500}, ['client:styles:dev']);

    gulp.watch(config.src.client.watch.lint, {interval: 500}, ['client:scripts:lint']);
    gulp.watch(config.src.client.watch.scripts, {interval: 500}, ['client:scripts:dev']);
    
    gulp.watch(config.src.shared.watch.lint, {interval: 500}, ['client:scripts:lint']);
    gulp.watch(config.src.shared.watch.scripts, {interval: 500}, ['client:scripts:dev']);

});
