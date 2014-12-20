gulp = require 'gulp'
bump = require 'gulp-bump'
concat = require 'gulp-concat'
uglify = require 'gulp-uglify'

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

gulp.task 'concat', ->
	gulp.src ['src/start', 'src/modules/*.js', 'src/end']
	.pipe concat 'please.min.js'
	.pipe uglify
		preserveComments: 'some'
	.pipe gulp.dest './dist'

gulp.task 'uglify', ->
	gulp.src 'src/Please.js'
	.pipe uglify
		preserveComments: 'some'
	.pipe gulp.dest 'dist'

gulp.task 'default', ->
	gulp.start 'uglify'