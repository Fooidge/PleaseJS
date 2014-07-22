'use strict';

var Duplex = require('stream').Duplex,
    batch = require('gulp-batch'),
    fs = require('vinyl-fs'),
    vinyl = require('vinyl'),
    path = require('path'),
    gutil = require('gulp-util');

module.exports = function (opts, cb) {
    var Gaze = require('gaze');

    if (typeof opts !== 'object') {
        cb = opts;
        opts = {};
    }

    if (Array.isArray(cb)) {
        var tasks = cb;
        var gulp = require('gulp');
        cb = function() {
            gulp.start.apply(gulp, tasks);
        }.bind(gulp);
    }

    opts.emit = opts.emit || 'one';
    opts.glob = opts.glob || [];
    if (typeof opts.glob === 'string') { opts.glob = [ opts.glob ]; }

    var duplex = new Duplex({ objectMode: true, allowHalfOpen: true });

    if (cb) {
        if (typeof cb !== 'function') { throw new Error('Provided callback is not a function: ' + cb); }
        cb = batch(opts, cb.bind(duplex));
    } else {
        cb = function () { };
    }

    duplex.gaze = new Gaze(opts.glob, opts.gaze || {});
    duplex._write = function _write(file, encoding, done) {
        duplex.gaze.add(file.path, function () {
            if (!opts.silent && opts.verbose) { logEvent('added to watch', file.path, opts); }
            done();
        });
        memorizeProperties(file);
        if (opts.passThrough !== false) { passThrough(file); }
    };
    duplex._read = function _read() { };

    duplex.on('finish', function () {
        if (!opts.silent) { fileCount(duplex.gaze, function (err, count) { logEvent('added from pipe', count, opts); }); }
    });

    duplex.close = function () {
        duplex.gaze.on('end', duplex.emit.bind(duplex, 'end'));
        duplex.gaze.close();
    };

    duplex.gaze.on('error', duplex.emit.bind(duplex, 'error'));
    duplex.gaze.on('ready', duplex.emit.bind(duplex, 'ready'));

    duplex.gaze.on('all', function (event, filepath) {
        if (!opts.silent) { logEvent(event, filepath, opts); }
        var glob = [ filepath ];
        if (opts.emit === 'all') {
            glob = glob.concat(opts.glob);
            glob = glob.concat(duplex.gaze._patterns);
        }
        if (event === 'deleted') { passThrough(voidFile(filepath, event)); }
        fs.src(glob, opts).on('data', function (file) {
            if (file.path === filepath) { file.event = event; }
            passThrough(file);
        });
    });

    if (opts.glob.length && opts.emitOnGlob !== false) {
        fs.src(opts.glob, opts).on('data', passThrough);
    }

    function voidFile(filepath, event) {
        var file = new vinyl({ path: filepath });
        file.event = event;
        return file;
    }

    function passThrough(file) {
        if (!opts.silent && opts.verbose) {
            logEvent('passed through', file.path, opts);
        }
        restoreProperties(file, opts);
        cb(file);
        duplex.push(file);
    }

    var pathCache = {};

    function restoreProperties(file) {
        if (pathCache[file.path]) {
            if (file.base) { file.base = pathCache[file.path].base; }
            if (file.cwd) { file.cwd = pathCache[file.path].cwd; }
        } else {
            file.base = calculateBase(file, opts.glob, opts) || file.base;
            memorizeProperties(file);
        }
    }

    function memorizeProperties(file) {
        pathCache[file.path] = {
            base: file.base,
            cwd: file.cwd
        };
    }

    return duplex;
};

function logEvent(event, filepath, opts) {
    var msg = [gutil.colors.magenta(path.basename(filepath)), 'was', event];
    if (opts.name) { msg.unshift(gutil.colors.cyan(opts.name) + ' saw'); }
    gutil.log.apply(gutil, msg);
}

module.exports.getWatchedFiles = function getWatchedFiles(gaze, cb) {
    var dirs = gaze._watched;
    var files = [];
    Object.keys(dirs).forEach(function (dir) {
        dirs[dir].forEach(function (file) {
            if (file[file.length - 1] !== '/') {
                files.push(file);
            }
        });
    });
    cb(null, files);
};

function fileCount(gaze, cb) {
    module.exports.getWatchedFiles(gaze, function (err, files) {
        if (err) { return cb(err); }
        var count = files.length;
        cb(null, count + (count === 1 ? ' file' : ' files'));
    });
}

module.exports.fileCount = fileCount;

var calculateBase = module.exports.calculateBase = require('./calculateBase.js');
