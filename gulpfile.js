var gulp = require('gulp'),
    fontgen = require('gulp-fontgen'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence');
 
gulp.task('fontgen', function() {
    return gulp.src('dist/print/*.ttf')
        .pipe(fontgen({
            dest: 'dist/web'
        }))
});

gulp.task('fontCleanup', function() {
    return gulp.src('dist/web/*.css')
        .pipe(replace('font-weight: 300', 'font-weight: 400'))
        .pipe(replace('font-family: "Seiden_Sans_Light"', 'font-family: "Seiden Sans"'))
        .pipe(replace('font-family: "Seiden_Sans_Regular"', 'font-family: "Seiden Sans"'))
        .pipe(replace('font-family: "Seiden_Sans_Bold"', 'font-family: "Seiden Sans"'))
        .pipe(gulp.dest('dist/web'));
});

gulp.task('watch', function() {
    gulp.watch('dist/print/*.ttf', ['fontgen']);
    gulp.watch('dist/web/*.css', ['fontCleanup']);
});

gulp.task('default', function() {
    runSequence('fontgen', ['fontCleanup', 'watch']);
});