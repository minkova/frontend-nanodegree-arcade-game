(function(){
    'use strict';

    var gulp = require('gulp');
    var browserSync = require('browser-sync');
    var reload = browserSync.reload;

    gulp.task('watch:all', ['serve'], function() {
        gulp.watch([
            'app/**/*.js',
            'app/**/*.css',
            'app/**/*.html'
        ], [reload]);
    });

    gulp.task('serve', function() {
        browserSync({
            server: {
                baseDir: 'app'
            },
            port: 4000,
            notify: true,
            open: true,
            ghostMode: false
        });
    });

    gulp.task('default', ['watch:all']);
}());