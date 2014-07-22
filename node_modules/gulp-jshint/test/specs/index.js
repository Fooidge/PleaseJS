var jshint = require('../../src');
var should = require('should');
var gutil = require('gulp-util');
var path = require('path');
require('mocha');

describe('gulp-jshint', function () {
  require('./compliance');
  require('./stream');
  require('./linting');
  require('./reporters');
  require('./integration');
});
