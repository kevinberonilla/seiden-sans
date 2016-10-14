var gulp = require('gulp'),
    fontgen = require('gulp-fontgen');
 
gulp.task('fontgen', function() {
  return gulp.src('dist/print/*.ttf')
    .pipe(fontgen({
        dest: 'dist/web'
    }))
});

gulp.task('watch', function() {
    gulp.watch('dist/print/*.ttf', ['fontgen']);
});

gulp.task('default', ['fontgen', 'watch']);