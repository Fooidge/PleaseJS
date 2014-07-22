var fixtureDir = require('path').resolve(__dirname, './fixtures');
var jshint = require('../');
var gutil = require('gulp-util');
var join = require('path').join;
var fs = require('fs');

var array = function (obj) {
  return Array.isArray(obj) ? obj : [obj];
};

var fictionalRoot = '/home/username/sources/project';

module.exports = {
  File: function (opts) {
    var path = join(fictionalRoot, opts.path);

    var contents = opts.contents
      ? new Buffer(opts.contents, 'utf8')
      : fs.readFileSync(join(__dirname, opts.path));

    return new gutil.File({
      cwd: fictionalRoot,
      base: fictionalRoot,
      path: path,
      contents: contents
    });
  },
  fixture: function (name) {
    return require(fixtureDir + '/' + name);
  },
  lint: function (opts, cb) {
    var dataEvents = 0;
    opts.files = array(opts.file || opts.files);
    opts.args = array(opts.config || opts.args);

    var done = function (err) {
      stream.removeAllListeners('end');
      stream.removeAllListeners('error');
      cb(err);
    };

    var stream = jshint.apply(null, opts.args);

    stream.on('data', function (file) {
      dataEvents++;
      return opts.eachFile(file);
    });
    stream.once('end', function () {
      dataEvents.should.equal(opts.files.length);
      done();
    });
    stream.once('error', done);

    opts.files.forEach(function (file) {
      stream.write(file);
    });

    stream.end();

    return stream;
  }
};