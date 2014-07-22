var gulp = require('gulp');
var jshint = require('./src');
var Mocha = require('mocha');

gulp.task('lint', function () {
  return gulp.src([
    'src/**/*',
    'test/**/*',
    '!test/fixtures/**/*',
    '*.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default', { verbose: true }))
  .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function (done) {
  var m = new Mocha({
    ui: 'bdd',
    reporter: 'spec'
  });

  m.addFile(__dirname + '/test/specs/index.js');

  m.run().on('end', done);
});