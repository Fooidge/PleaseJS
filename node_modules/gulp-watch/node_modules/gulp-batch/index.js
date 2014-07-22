'use strict';

var es = require('event-stream');

module.exports = function (opts, cb) {
    if (typeof opts === 'function') {
        cb = opts;
        opts = {};
    }

    if (typeof cb !== 'function') {
        throw new Error('Provided callback is not a function: ' + cb);
    }

    opts.debounce = opts.debounce || 0;
    opts.timeout = opts.timeout || 200;

    var batch = [];
    var holdOn;
    var timeout;

    function brace() {
        if (!holdOn && batch.length) {
            timeout = setTimeout(flush, opts.timeout);
        }
    }

    function async() {
        holdOn = true;
        return function (err) {
            if (err) {
                holdOn = false;
                return domain.emit('error', err);
            }

            if (opts.debounce) {
                setTimeout(function () {
                    holdOn = false;
                    brace();
                }, opts.debounce);
            } else {
                holdOn = false;
                brace();
            }
        };
    }

    var domain = require('domain').create();

    function flush() {
        if (!batch.length) { return; }
        var _batch = es.readArray(batch);
        var streamError;
        batch = [];
        if (cb.length < 2) {
            var r = domain.bind(cb)(_batch);
            if (r && typeof r.pipe === 'function') {
                var asyncCb = async();
                // wait for stream to end
                r.on('error', function (err) {
                    streamError = err;
                });
                r.on('data', function () {
                    streamError = null; // The error wasn't fatal, move along
                });
                r.once('end', function () {
                    asyncCb(streamError);
                });
            }
        } else {
            domain.bind(cb)(_batch, async());
        }
    }

    var f = function (event) {
        batch.push(event);

        if (timeout) { clearTimeout(timeout); }

        if (opts.limit && batch.length >= opts.limit) {
            flush();
        } else {
            brace();
        }
    };

    f.domain = domain;

    return f;
};
