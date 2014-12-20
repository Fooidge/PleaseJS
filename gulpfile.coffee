gulp = require 'gulp'
bump = require 'gulp-bump'
uglify = require 'gulp-uglify'

gulp.task 'uglify', ->
	gulp.src 'src/Please.js'
	.pipe uglify
		preserveComments: 'some'
	.pipe gulp.dest 'dist'

gulp.task 'bump-major', ->
	gulp.src ['./bower.json', './component.json', './package.json']
	.pipe bump
		type: 'major'
	.pipe gulp.dest './'

gulp.task 'bump-minor', ->
	gulp.src ['./bower.json', './component.json', './package.json']
	.pipe bump
		type: 'minor'
	.pipe gulp.dest './'

gulp.task 'bump-patch', ->
	gulp.src ['./bower.json', './component.json', './package.json']
	.pipe bump
		type: 'patch'
	.pipe gulp.dest './'

gulp.task 'default', ->
	gulp.start 'uglify'