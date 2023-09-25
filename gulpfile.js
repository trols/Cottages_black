'use strict'


const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

gulp.task('less', function() {
    return gulp.src('./src/styles/styles.less')

        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});
gulp.task('watch',  function () {
    gulp.watch('./src/styles/styles.less',gulp.series('less'));
});



