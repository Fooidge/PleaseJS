var stream = require('../stream');
var PluginError = require('gulp-util').PluginError;

module.exports = function () {
  var fails = null;
  var buffer = [];

  return stream(
    function through(file) {
      // check for failure
      if (file.jshint && !file.jshint.success && !file.jshint.ignored) {
        (fails = fails || []).push(file.path);
        buffer = false;
      }

      if (buffer) buffer.push(file);
    }, function flush() {
      if (fails) {
        this.emit('error', new PluginError('gulp-jshint', {
          message: 'JSHint failed for: ' + fails.join(', '),
          showStack: false
        }));
      }
      else {
        // send on the buffered files
        buffer.forEach(function (file) {
          this.push(file);
        }, this);
      }
    }
  );
};
