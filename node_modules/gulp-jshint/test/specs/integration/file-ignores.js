var gutil = require('gulp-util');
var tutil = require('../../util');
var jshint = require('../../../src');
var path = require('path');
var should = require('should');

describe('file ignores', function () {
  it('should ignore based on simple directory name', function (done) {
    tutil.lint({
      config: tutil.fixture('.rc-undef'),
      file: new tutil.File({
        path: 'node_modules/vendor.js',
        contents: new Buffer('wadup = 123;')
      }),
      eachFile: function (file) {
        should(file).not.have.property('jshint');
      }
    }, done);
  });

  it('should ignore based on simple directory name with trailing slash', function (done) {
    tutil.lint({
      config: tutil.fixture('.rc-undef'),
      file: new tutil.File({
        path: 'test_ignore_stuff/vendor.js',
        contents: new Buffer('wadup = 123;')
      }),
      eachFile: function (file) {
        should(file).not.have.property('jshint');
      }
    }, done);
  });
});