var gutil = require('gulp-util');
var tutil = require('../../util');
var jshint = require('../../../src');
var should = require('should');
var path = require('path');

function FakeFile(content) {
  return new tutil.File({
    path: './test/fixture/file.js',
    contents: content || 'wadup();'
  });
}

describe('reporting', function () {
  it('should send success status', function (done) {
    tutil.lint({
      file: new FakeFile,
      eachFile: function (file) {
        should(file).property('jshint');
        should(file.jshint).property('success').equal(true);

        should(file.jshint).not.have.property('results');
        should(file.jshint).not.have.property('data');
        should(file.jshint).not.have.property('opt');
      }
    }, done);
  });

  it('should send failure status', function (done) {
    tutil.lint({
      file: new FakeFile('doe ='),
      eachFile: function (file) {
        should(file).have.property('jshint');

        should(file.jshint).property('success').equal(false);
        should(file.jshint).property('results').is.an.Array;
        should(file.jshint).property('data').is.an.Array;
      }
    }, done);
  });

  it('should load jshint file and pass', function (done) {
    var a = 0;

    var fakeFile = new gutil.File({
      path: './test/fixture/file.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer('wadup = 123;')
    });

    var stream = jshint(tutil.fixture('.rc-!undef'));
    stream.on('data', function (newFile) {
      ++a;
      should.exist(newFile.jshint.success);
      newFile.jshint.success.should.equal(true);
      should.not.exist(newFile.jshint.results);
      should.not.exist(newFile.jshint.data);
      should.not.exist(newFile.jshint.opt);
    });
    stream.once('end', function () {
      a.should.equal(1);
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });
});

require('./fail');

describe('jshint.reporter()', function () {
  it('file should pass through', function (done) {
    var a = 0;

    var fakeFile = new gutil.File({
      path: './test/fixture/file.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer('wadup();')
    });

    var stream = jshint.reporter();
    stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.path);
      should.exist(newFile.relative);
      should.exist(newFile.contents);
      newFile.path.should.equal('./test/fixture/file.js');
      newFile.relative.should.equal('file.js');
      ++a;
    });

    stream.once('end', function () {
      a.should.equal(1);
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });

  it('file should trigger reporter when .jshint exists', function (done) {
    var fakeFile = new gutil.File({
      path: './test/fixture/file.js',
      cwd: './test/',
      base: './test/fixture/',
      contents: new Buffer('wadup();')
    });

    fakeFile.jshint = {
      success: false,
      results: 200, // not real data
      data: 300, // not real data
      opt: {} // not real data
    };

    var stream = jshint.reporter(function (results, data, opt) {
      should(results).equal(200);
      should(data).equal(300);
      should(opt).eql({});
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });
});