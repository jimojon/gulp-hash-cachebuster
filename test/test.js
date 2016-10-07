var gulp = require('gulp');
var assert = require('assert');
var File = require('vinyl');
var cachebust = require('../');

describe('gulp-hash-cachebuster', function() {
    describe('in buffer mode', function() {

        it('should emit error on streamed file', function (done) {
            gulp.src("test/src/index.html", { buffer: false })
                .pipe(cachebust())
                .on('error', function (err) {
                    assert.equal(err.message, 'Streaming not supported');
                    done();
                });
        });

        it('should ignore asset without src', function (done) {
            var fakeFile = new File({
                contents: new Buffer('<!DOCTYPE html><html lang="en"><script>console.log("Hello")</script><link></link></html>')
            });

            var cb = cachebust();
            cb.write(fakeFile);
            cb.once('data', function(file)
            {
                // make sure it came out the same way it went in
                assert(file.isBuffer());

                // check the contents
                assert.equal(file.contents.toString('utf8'), fakeFile.contents);
                done();
            });
        });

        it('should ignore non-existent asset', function (done) {
            var fakeFile = new File({
                contents: new Buffer('<!DOCTYPE html><html lang="en"><script src="nothing">console.log("Hello")</script><link></link></html>')
            });

            var cb = cachebust();
            cb.write(fakeFile);
            cb.once('data', function(file)
            {
                // make sure it came out the same way it went in
                assert(file.isBuffer());

                // check the contents
                assert.equal(file.contents.toString('utf8'), fakeFile.contents);
                done();
            });
        });
    });
});