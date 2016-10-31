var gulp = require('gulp'),
    fontgen = require('gulp-fontgen'),
    replace = require('gulp-replace'),
    mergeStream = require('merge-stream'),
    runSequence = require('run-sequence');
 
gulp.task('fontgen', function() {
    return gulp.src('dist/print/*.ttf')
        .pipe(fontgen({
            dest: 'dist/web'
        }))
});

gulp.task('fontCleanup', function() {
    var regular = gulp.src('dist/web/SeidenSans-Regular.css')
        .pipe(replace('font-weight: 300', 'font-weight: 400'))
        .pipe(replace('font-family: "Seiden_Sans_Regular"', 'font-family: "Seiden Sans"'))
        .pipe(gulp.dest('dist/web'));
    
    var light = gulp.src('dist/web/SeidenSans-Light.css')
        .pipe(replace('font-family: "Seiden_Sans_Light"', 'font-family: "Seiden Sans"'))
        .pipe(gulp.dest('dist/web'));
    
    var bold = gulp.src('dist/web/SeidenSans-Bold.css')
        .pipe(replace('font-family: "Seiden_Sans_Bold"', 'font-family: "Seiden Sans"'))
        .pipe(gulp.dest('dist/web'));
    
    return mergeStream(regular, light, bold);
});

gulp.task('watch', function() {
    gulp.watch('dist/print/*.ttf', ['fontgen']);
    gulp.watch('dist/web/*.css', ['fontCleanup']);
});

gulp.task('default', function() {
    runSequence('fontgen', ['fontCleanup', 'watch']);
});