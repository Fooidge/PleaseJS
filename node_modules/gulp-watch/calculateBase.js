/*
    This is some sort of copy-paste from
    https://github.com/wearefractal/glob-stream/blob/master/index.js
*/

'use strict';

var path = require('path'),
    minimatch = require('minimatch'),
    glob2base = require('glob2base'),
    glob = require('glob');

var isMatch = function(file, opt, pattern) {
    if (typeof pattern === 'string') { return minimatch(file.path, pattern, opt); }
    if (pattern instanceof RegExp) { return pattern.test(file.path); }
    return true;
};

var isNegative = function(pattern) {
    if (typeof pattern !== 'string') { return true; }
    if (pattern[0] === '!') { return true; }
    return false;
};

var isPositive = function(pattern) {
    return !isNegative(pattern);
};

var unrelative = function(cwd, glob) {
    var mod = '';
    if (glob[0] === '!') {
        mod = glob[0];
        glob = glob.slice(1);
    }
    return mod + path.resolve(cwd, glob);
};

module.exports = function calculateBase(file, globs, opt) {
    opt = opt || {};
    opt.cwd = opt.cwd || file.cwd;

    if (typeof globs === 'string') { globs = [ globs ]; }

    var matchingGlobs = globs
        .filter(isPositive)
        .map(unrelative.bind(null, opt.cwd))
        .filter(isMatch.bind(null, file, opt));

    if (matchingGlobs.length === 0) { return undefined; }

    var ourGlob = matchingGlobs[0];
    ourGlob = unrelative(opt.cwd, ourGlob);

    var globber = new glob.Glob(ourGlob, opt);
    return opt.base ? opt.base : path.relative(opt.cwd, glob2base(globber)) + '/';
};
