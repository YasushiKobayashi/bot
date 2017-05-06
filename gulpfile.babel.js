import gulp from 'gulp';
import babel from 'gulp-babel';

gulp.task('jsBuild', () => {
  gulp.src(['bot/es/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('bot/scripts/'));
});

gulp.task('default', ['build'], () => {
  gulp.watch(
    ['bot/es/*.js'],
    ['build'],
  );
});

gulp.task('build', ['jsBuild'], () => {});
