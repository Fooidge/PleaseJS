var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

gulp.task('lint', function() {
  return gulp.src('./please.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  gulp.src('please.js')
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  watch({glob: './please.js'}, ['lint']);
});

gulp.task('default', ['lint', 'compress']);
