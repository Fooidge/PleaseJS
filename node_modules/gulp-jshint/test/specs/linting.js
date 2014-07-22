var gutil = require('gulp-util');
var jshint = require('../../src');

describe('linting', function () {
  it('should jshint two files', function (done) {
    var a = 0;

    var fakeFile = new gutil.File({
      path: './test/fixture/file.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer('wadup();')
    });

    var fakeFile2 = new gutil.File({
      path: './test/fixture/file2.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer('wadup();')
    });

    var stream = jshint();
    stream.on('data', function (newFile) {
      ++a;
    });

    stream.once('end', function () {
      a.should.equal(2);
      done();
    });

    stream.write(fakeFile);
    stream.write(fakeFile2);
    stream.end();
  });
});