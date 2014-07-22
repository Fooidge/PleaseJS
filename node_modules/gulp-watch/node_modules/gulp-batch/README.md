# [gulp](https://github.com/gulpjs/gulp)-batch [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status](https://coveralls.io/repos/floatdrop/gulp-batch/badge.png)](https://coveralls.io/r/floatdrop/gulp-batch) [![Dependency Status][depstat-image]][depstat-url]
> Event batcher for gulp-watch'er.

This is problem solver for [this issue](https://github.com/gulpjs/gulp/issues/80) with [gulp.watch](https://github.com/gulpjs/gulp#gulpwatchglob-cb) and [gulp-mocha](https://github.com/sindresorhus/gulp-mocha).
Long story short - example below without `batch`'ing will call mocha as many times, as many files was changed (for example `git checkout` can touch dozens files).

Also it is used in [`gulp-watch`](https://github.com/floatdrop/gulp-watch) to provide batching callback handler, instead of streaming events from gaze.

## Usage

Main purpose for this module is running tests in `gulp-watch`. So here it is:

```js
// npm i gulp gulp-watch gulp-mocha gulp-batch
 
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var batch = require('gulp-batch');

gulp.src(['lib/**', 'test/**'], batch(function(events) {
    return events
        .pipe(mocha({ reporter: 'list' }));
}));
```

## API

### batch([options,] callback)

This function creates batcher for provided callback.
It will call it, when bunch of events happens near in time, so you will
be running your test only once per `git checkout` command (for example).

__Callback signature__: `function(events, [done])`.

 * `events` - is `Stream` of incoming events.
 * `done` - is callback for your function signal to batch, that you are done. This allows to run your callback as soon as previous end. Error can be passed as argument.

__Options__:

 * `debounce` - Minimal interval between calling callback after `done` (only works with async callback) (default: `0`)
 * `limit` - Maximum events number, that gets into one batch (default: `undefined` - unlimited)
 * `timeout` - Interval in milliseconds, that counts as "no more events will arrive" (default: `200`)

__Returns__:

Wrapped callback, that will gather events and call callback.

## How to catch errors

From version 0.3.0 `gulp-batch` supports domains. This code should clarify, how to catch errors from `gulp-batch`:

```js
var domain = require('domain').create();

domain.on('error', function (err) {
    console.log(err);
});

var receiver = domain.bind(batch({ timeout: 10 }, function () {
    throw new Error('Bang!');
}));

receiver('one');
```

# License

(MIT License)

Copyright (c) 2013 Vsevolod Strukchinsky (floatdrop@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[npm-url]: https://npmjs.org/package/gulp-batch
[npm-image]: https://badge.fury.io/js/gulp-batch.png

[travis-url]: http://travis-ci.org/floatdrop/gulp-batch
[travis-image]: https://travis-ci.org/floatdrop/gulp-batch.png?branch=master

[depstat-url]: https://david-dm.org/floatdrop/gulp-batch
[depstat-image]: https://david-dm.org/floatdrop/gulp-batch.png?theme=shields.io
