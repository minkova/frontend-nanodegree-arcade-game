(function(){
    'use strict';

    var gulp = require('gulp');
    var browserSync = require('browser-sync').create();
    var reload = browserSync.reload;

    gulp.task('watch:all', function() {
        gulp.watch([
            'app/**/*.js',
            'app/**/*.css',
            'app/**/*.html'
        ], [reload]);
    });

    gulp.task('serve', function(){
        browserSync.init({
            server: {
                baseDir: 'app'
            },
            port: 4000,
            notify: true,
            open: true,
            ghostMode: false
        });
    });

    gulp.task('default', ['watch:all', 'serve']);
}());