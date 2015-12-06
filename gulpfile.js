var gulp    = require('gulp');
var mocha = require('gulp-mocha');
var gulphelp = require('gulp-help')(gulp);
var nodemon = require('gulp-nodemon');


var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("default", function () {
  return gulp.src(["src/**/*.js", "test/**/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
});

gulp.task('nodemon', 'Run nodemon', ['watch'], function() {  
    nodemon({
        script: './src/index.js',
        exec: 'babel-node'
    });
});

gulp.task('watch', 'Watch all js files.', function() {  
    gulp.watch("src/**/*.js", ["nodemon"]);
});

gulp.task('test', 'Runs the Mocha tests.', function () {
    return gulp.src('test/**/*.js')
        .pipe(mocha({reporter: 'xunit'}));
});