var gulp = require('gulp');
var coffeelint = require('gulp-coffeelint');
gulp.task('lint', function () {
    gulp.src('bot/scripts/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
});
