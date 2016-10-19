var gulp = require('gulp');
var gutil = require('gulp-util');
var cachebust = require('.');

gulp.task('css', function () {
    return gulp.src('./test/fixture/src/css/*')
        .pipe(gulp.dest('./build/css/'));
});

gulp.task('js', function () {
    return gulp.src('./test/fixture/src/hello.js')
        .pipe(gulp.dest('./build/'));
});

gulp.task('html', ['css', 'js'], function () {
    return gulp.src('./test/fixture/src/index.html')
        .pipe(gulp.dest('./build/'));
});

gulp.task('cachebust', ['html'], function () {
    return gulp.src('./build/index.html')
        .pipe(cachebust()).on("warning", function(message){
            gutil.log(gutil.colors.red(message));
        })
        .pipe(gulp.dest('./build/'));
});