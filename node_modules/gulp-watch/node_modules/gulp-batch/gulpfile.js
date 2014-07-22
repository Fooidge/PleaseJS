'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var batch = require('./index.js');

gulp.task('mocha', function () {
    return gulp.src(['test/*.js'])
        .pipe(mocha({ reporter: 'list' }))
        .on('error', function (err) {
            console.log(err.stack);
        });
});

gulp.task('watch', function () {
    gulp.watch(['test/**', 'index.js'], batch(function (events, cb) {
        gulp.run('mocha', cb);
    }));
});

gulp.task('default', function () {
    gulp.run('mocha');
    gulp.run('watch');
});
