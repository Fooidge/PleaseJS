var gutil = require('gulp-util');
var tutil = require('../../util');
var jshint = require('../../../src');
var path = require('path');
var should = require('should');

function FakeFile(argument) {
  return new tutil.File({
    path: 'fixture/file.js',
    contents: 'wadup = 123;'
  });
}

describe('basic', function () {
  it('should use passed config and fail', function (done) {
    tutil.lint({
      args: tutil.fixture('.rc-undef'),
      files: new FakeFile,
      eachFile: function (newFile) {
        should.exist(newFile.jshint.success);
        newFile.jshint.success.should.equal(false);
        should.exist(newFile.jshint.results);
        should.exist(newFile.jshint.data);
        should.exist(newFile.jshint.opt);
        newFile.jshint.results[0].error.reason.should.equal('\'wadup\' is not defined.');
      }
    }, done);
  });

  it('should use passed config and pass', function (done) {
    tutil.lint({
      config: tutil.fixture('.rc-!undef'),
      file: new FakeFile,
      eachFile: function (newFile) {
        should.exist(newFile.jshint.success);
        newFile.jshint.success.should.equal(true);
        should.not.exist(newFile.jshint.results);
        should.not.exist(newFile.jshint.data);
        should.not.exist(newFile.jshint.opt);
      }
    }, done);
  });
});