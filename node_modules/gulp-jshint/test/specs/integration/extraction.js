var tutil = require('../../util');
var jshint = require('../../../src');
var should = require('should');

var lint = function (opts) {
  return function (done) {
    var head = jshint.extract(opts.extract);
    var tail = head.pipe(jshint());

    var n = 0;
    tail.on('data', function (file) {
      n++;
      opts.eachFile(file);
    });

    tail.on('end', function () {
      n.should.eql(1);
      done();
    });

    var file = opts.file;
    if (!file) {
      file = new tutil.File({
        path: opts.path
      });
    }

    head.write(file);
    head.end();
  };
};

describe('with Script Extraction', function () {
  it('should fail with invalid script', lint({
    path: 'fixtures/broken.html',
    eachFile: function (file) {
      file.jshint.should.have.property('success', false);
      file.jshint.should.have.property('extracted');
    }
  }));

  it('should pass with valid script', lint({
    path: 'fixtures/solid.html',
    eachFile: function (file) {
      file.jshint.should.have.property('success', true);
      file.jshint.should.have.property('extracted');
    }
  }));

  it('should lint the actual HTML when arg is set to none', lint({
    extract: 'none',
    path: 'fixtures/solid.html',
    eachFile: function (file) {
      file.jshint.should.have.property('success', false);
      file.jshint.should.have.property('extracted');
      file.jshint.extracted.should.match(/^<!DOCTYPE html>/);
    }
  }));

  it('should obey the jshintignore file', lint({
    file: new tutil.File({
      path: 'node_modules/module/docs/index.html',
      contents: new Buffer('<html><head><script> invalid script </script></head></html>', 'utf8')
    }),
    eachFile: function (file) {
      file.should.not.have.property('jshint');
    }
  }));
});