var gulp = require('gulp');
var assert = require('assert');
var File = require('vinyl');
var cachebust = require('../');

describe('gulp-hash-cachebuster', function() {

    it('should emit error on streamed file', function (done) {
        gulp.src("test/fixture/src/index.html", { buffer: false })
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

    it('should emit an error on non-existent asset', function (done) {
        var fakeFile = new File({
            contents: new Buffer('<!DOCTYPE html><html lang="en"><script src="null">console.log("Hello")</script><link></link></html>'),
            path: __dirname + '/fixture/src/test.html'
        });

        var cb = cachebust();
        try{
            cb.write(fakeFile);
        }catch(e){
            var message = "Asset not found:";
            assert.equal(e.message.substr(0, message.length), message);
            done();
        }
    });

    it('should generate expected content', function (done)
    {
        var source = '<!DOCTYPE html>' +
            '<head>' +
            '   <link rel="stylesheet" href="css/hello.css">' +
            '   <script src="hello.js"></script>' +
            '   <script>' +
            '       console.log("Oh yeah...");' +
            '   </script>' +
            '</head>' +
            '</html>';

        var fakeFile = new File({
            contents: new Buffer(source),
            path: __dirname + '/fixture/src/test.html'
        });

        var expect = '<!DOCTYPE html>' +
            '<head>' +
            '   <link rel="stylesheet" href="css/hello.css?hash=08c84b1b1dbe491f09c7c566d7aa7e20">' +
            '   <script src="hello.js?hash=b251ed91e4a2f97555dabf78b8266c77"></script>' +
            '   <script>' +
            '       console.log("Oh yeah...");' +
            '   </script>' +
            '</head>' +
            '</html>';
        
        var cb = cachebust();
        cb.write(fakeFile);
        cb.once('data', function(file)
        {
            // make sure it came out the same way it went in
            assert(file.isBuffer());

            // check the contents
            assert.equal(file.contents.toString('utf8'), expect);
            done();
        });

    });

});