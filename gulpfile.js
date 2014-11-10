var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	bump = require('gulp-bump');

gulp.task('uglify', function(){
	gulp.src('src/Please.js')
		.pipe(uglify({
			preserveComments: 'some',
		}))
		.pipe(gulp.dest('dist'));
});
gulp.task('lint', function(){
	return gulp.src('src/Please.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('bump-major', function(){
	gulp.src(['./bower.json', './component.json', './package.json'])
	.pipe(bump({type:'major'}))
	.pipe(gulp.dest('./'));
});
gulp.task('bump-minor', function(){
	gulp.src(['./bower.json', './component.json', './package.json'])
	.pipe(bump({type:'minor'}))
	.pipe(gulp.dest('./'));
});
gulp.task('bump-patch', function(){
	gulp.src(['./bower.json', './component.json', './package.json'])
	.pipe(bump({type:'patch'}))
	.pipe(gulp.dest('./'));
});
/*
gulp.task('watch', function(){
	gulp.watch('Please.js',['uglify']);
});
*/
gulp.task('default', [], function(){
	gulp.start('uglify');
	gulp.start('lint');
});