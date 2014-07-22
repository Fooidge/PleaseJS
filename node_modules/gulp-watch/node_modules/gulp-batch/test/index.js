/* global describe, it */
'use strict';

delete require.cache[require.resolve('..')];
var batch = require('..');
var assert = require('power-assert');
var es = require('event-stream');
var async = require('async');

var defaultTimeout = 10,
    defaultDebounce = 10;

describe('glob-batch', function () {

    it('should attach holdOff to stream end', function (done) {
        var signal = false;
        var receiver = batch({ timeout: defaultTimeout }, function (events) {
            return events.pipe(es.map(function (data, cb) {
                if (signal) { done(new Error('Tasks was started parallel')); }
                if (!signal && data === 'two') { done(); }
                signal = true;
                setTimeout(function () {
                    signal = false;
                    cb();
                }, 20);
            }));
        });
        receiver('one');
        setTimeout(receiver.bind(receiver, 'two'), 15);
    });

    it('should swap callback, if options omitted', function (done) {
        var receiver = batch(function () { done(); });
        receiver('one');
    });

    it('should support domains `on(\'error\', ...)` without callback', function (done) {
        var domain = require('domain').create();
        domain.on('error', function (err) {
            assert.ok(err);
            done();
        });
        var receiver = domain.bind(batch({ timeout: defaultTimeout }, function () {
            throw new Error('Bang!');
        }));
        receiver('one');
    });

    it('should support domains `on(\'error\', ...)` without callback', function (done) {
        var domain = require('domain').create();
        domain.on('error', function (err) {
            assert.ok(err);
            done();
        });
        var receiver = domain.bind(batch({ timeout: defaultTimeout }, function () {
            throw new Error('Bang!');
        }));
        receiver('one');
    });

    it('should support domains `on(\'error\', ...)` with callback', function (done) {
        var domain = require('domain').create();
        domain.on('error', function (err) {
            assert.ok(err);
            done();
        });
        var receiver = domain.bind(batch({ timeout: defaultTimeout }, function (events, async) {
            async(new Error('Bang!'));
        }));
        receiver('one');
    });

    it('should support domains `on(\'error\', ...)` with callback, but with throw', function (done) {
        var domain = require('domain').create();
        domain.on('error', function (err) {
            assert.ok(err);
            done();
        });
        var receiver = domain.bind(batch({ timeout: defaultTimeout }, function (events, async) {
            throw new Error('Bang!');
        }));
        receiver('one');
    });

    it('should batch sync calls to stream', function (done) {
        var receiver = batch({ timeout: defaultTimeout }, function (events) {
            events.pipe(es.writeArray(function (err, array) {
                assert.equal(array.length, 2);
            }));
            done();
        });
        receiver('one');
        receiver('two');
    });

    it('should batch async calls to stream', function (done) {
        var receiver = batch({ timeout: defaultTimeout }, function (events) {
            events.pipe(es.writeArray(function (err, array) {
                assert.equal(array.length, 2);
            }));
            done();
        });
        receiver('one');
        setTimeout(receiver.bind(null, 'two'), 5);
    });

    it('should flush, if we exceed timeout', function (done) {
        var iterator = async.iterator([
            function (events) {
                events.pipe(es.writeArray(function (err, array) {
                    assert.equal(array.length, 1);
                }));
            },
            function () { done(); }
        ]);

        var receiver = batch({ timeout: 5 }, function (events) {
            iterator = iterator(events);
        });

        receiver('one');
        setTimeout(receiver.bind(null, 'two'), defaultTimeout);
    });

    it('should flush, if we exceed limit', function (done) {
        var iterator = async.iterator([
            function (events) {
                events.pipe(es.writeArray(function (err, array) {
                    assert.equal(array.length, 2);
                }));
            },
            function (events) {
                events.pipe(es.writeArray(function (err, array) {
                    assert.equal(array.length, 1);
                }));
                done();
            }
        ]);
        var receiver = batch({ timeout: defaultTimeout, limit: 2 }, function (events) {
            iterator = iterator(events);
        });
        receiver('one');
        receiver('two');
        receiver('three');
    });

    it('should support done callback function', function (done) {
        var iterator = async.iterator([
            function (events, cb) {
                receiver('two');
                setTimeout(function () {
                    cb();
                    receiver('three');
                }, 15);
            },
            function (events) {
                events.pipe(es.writeArray(function (err, array) {
                    assert.equal(array.length, 2);
                }));
                done();
            }
        ]);
        var receiver = batch({ timeout: defaultTimeout }, function (events, cb) {
            iterator = iterator(events, cb);
        });
        receiver('one');
    });

    it('should support debounce option', function (done) {
        var iterator = async.iterator([
            function (events, cb) {
                receiver('two');
                setTimeout(function () {
                    cb();
                    setTimeout(receiver.bind(null, 'three'), 15);
                }, 15);
            },
            function (events) {
                events.pipe(es.writeArray(function (err, array) {
                    assert.equal(array.length, 2);
                }));
                done();
            }
        ]);
        var receiver = batch({ timeout: defaultTimeout, debounce: defaultDebounce }, function (events, cb) {
            iterator = iterator(events, cb);
        });
        receiver('one');
    });

    it('should throw, if we provide invalid callback', function () {
        assert.throws(batch, /Provided callback is not a function/);
        assert.throws(batch.bind(null, 'string'), /Provided callback is not a function/);
    });

});
