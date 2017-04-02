import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import coffeelint from 'gulp-coffeelint';
import uglify from 'gulp-uglify';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import transform from 'vinyl-transform';

gulp.task('coffeeLint', () => {
    gulp.src('bot/scripts/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter());
});

gulp.task('jsLint', () => {
  gulp.src('bot/*.js')
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jsBuild', () => {
  // browserify('bot/es/app.js')
  //   .transform(babelify)
  //   .bundle()
  //   .pipe(source('bundle.js'))
  //   .pipe(gulp.dest('./bot/scripts/'));

  gulp.src('bot/es/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./bot/scripts/'));

  gulp.src('es/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./js'));

});

gulp.task('default', ['build'], () => {
  gulp.watch(
    ['bot/es/*.js', 'es/*.js'],
    ['build'],
  );
});

gulp.task('build', ['jsBuild'], () => {});
gulp.task('lint', ['coffeeLint', 'jsLint'], () => {});
