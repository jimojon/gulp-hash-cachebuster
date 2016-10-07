var gulp = require('gulp');
var cachebust = require('.');

gulp.task('css', function () {
    return gulp.src('./test/src/css/*')
        .pipe(gulp.dest('./test/build/css/'));
});

gulp.task('js', function () {
    return gulp.src('./test/src/hello.js')
        .pipe(gulp.dest('./test/build/'));
});

gulp.task('html', ['css', 'js'], function () {
    return gulp.src('./test/src/index.html')
        .pipe(gulp.dest('./test/build/'));
});

gulp.task('cachebust', ['html'], function () {
    return gulp.src('./test/build/index.html')
        .pipe(cachebust())
        .pipe(gulp.dest('./test/build/'));
});