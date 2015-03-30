'use strict';

var gulp = require('gulp');
var config = require('../../gulpconfig.json')

var server = require('gulp-develop-server');
var browserSync = require('browser-sync');
//
gulp.task('watch:server', ['server:scripts:dev', 'server:start', 'server:restart'], function() {

    gulp.watch(config.src.server.watch.lint, ['server:scripts:lint']);
    gulp.watch(config.src.server.watch.scripts, ['server:scripts:dev']);
    
    gulp.watch(config.src.shared.watch.lint, ['server:scripts:lint']);
    gulp.watch(config.src.shared.watch.scripts, ['server:scripts:dev']);

});

// run server 
gulp.task('server:start', function() {
    console.log('Server Start');
    server.listen( { path: './distribution/server.js' } );
});
 
// restart server if server.js changed 
gulp.task('server:restart', ['server:start'], function() {
    console.log('Server Restart');
    gulp.watch( [ './distribution/server.js' ], server.restart );
});
