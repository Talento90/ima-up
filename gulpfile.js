
'use strict';
var gulp = require('gulp');
var lab = require('gulp-lab');
var gulphelp = require('gulp-help')(gulp);
var nodemon = require('gulp-nodemon');
var rimraf = require('gulp-rimraf');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var src = 'src/**/*.js';
var test = 'test/**/*.js';
var srcOption = { base: './' };
var dest = './build';

gulp.task('clean', function () {
    return gulp.src(dest, {read: false})
        .pipe(rimraf());
});

gulp.task('build', 'Build Babel Files.', ['clean'], function () {
    return gulp.src([src, test], srcOption)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '../..' }))
        .pipe(gulp.dest(dest));
});

gulp.task('nodemon', 'Run nodemon', ['build'], function() {  
    nodemon({
        script: './build/src/index.js',
        watch: [src],
        env: { 'NODE_ENV': 'dev'}
    }).on('restart', ['build']);;
});

gulp.task('test', 'Runs the Mocha tests.', function () {
    return gulp.src('./build/test/**/*.js')
        .pipe(lab({
            args: '-v -C -r junit -o reports/tests.xml',
            opts: {
                emitLabError: true
            }
        }));
});


gulp.task('default', 'Default task.', ['nodemon']);