var gutil = require('gulp-util');
var jshint = require('../../../src');

var readFile = function (path) {
  path = require('path').join(__dirname, path);
  return require('fs').readFileSync(path);
};

describe('overrides option', function () {
  it('should override the config when matching patterns are found', function (done) {
    var fakeFile = new gutil.File({
      path: './test/fixture/fileIndent4.js',
      base: './',
      contents: new Buffer('wadup();')
    });

    var fakeFile2 = new gutil.File({
      path: './test/fixture/fileIndent8.js',
      base: './',
      contents: new Buffer('wadup();')
    });

    var jshintrc = JSON.parse(readFile('../../../.jshintrc'));
    jshintrc.overrides = {
      "*Indent4.js": {
        "indent": 4
      },
      "*Indent8.js": {
        "indent": 8
      }
    };

    var stream = jshint(jshintrc);
    stream.on('data', function (file) {
      if (file.relative === "test/fixture/fileIndent4.js") {
        file.jshint.opt.indent.should.equal(4);
      }

      if (file.relative === "test/fixture/fileIndent8.js") {
        file.jshint.opt.indent.should.equal(8);
      }
    });

    stream.once('end', function () {
      done();
    });

    stream.write(fakeFile);
    stream.write(fakeFile2);
    stream.end();
  });
});
