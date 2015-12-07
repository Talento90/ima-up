
'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gulphelp = require('gulp-help')(gulp);
var nodemon = require('gulp-nodemon');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var src = ['src/**/*.js'];
var srcOption = { base: './' };
var dest = './build';


gulp.task('clean', function () {
    return gulp.src(dest, {read: false})
        .pipe(clean());
});

gulp.task('build', ['clean'], function () {
    return gulp.src(src, srcOption)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '..' }))
        .pipe(gulp.dest(dest));
});

gulp.task('nodemon', 'Run nodemon', ['watch'], function() {  
    nodemon({
        script: './build/src/index.js'
    });
});

gulp.task('watch', 'Watch all js files.', ['build'], function() {  
    gulp.watch("src/**/*.js", ['build']);
});

gulp.task('test', 'Runs the Mocha tests.', function () {
    return gulp.src('test/**/*.js')
        .pipe(mocha({reporter: 'xunit'}));
});
