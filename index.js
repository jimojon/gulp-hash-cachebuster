var through = require('through2');
var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var $ = require('cheerio');
var md5File = require('md5-file');

// Consts
const PLUGIN_NAME = 'gulp-hash-cachebuster';

var bust = function(fileRoot, fileContents)
{
    // Test for http(s) and don't cache bust if (assumed) served from CDN
    var protocolRegEx = /^http(s)?/;

    var scripts = $(fileContents).find('script'),
        styles = $(fileContents).find('link[rel=stylesheet]');

    var assets = [];
    for (var i = 0; i < styles.length; i++) {
        assets.push(styles[i].attribs.href);
    }

    for (var i = 0; i < scripts.length; i++) {
        assets.push(scripts[i].attribs.src);
    }

    var src;
    for (var i = 0; i < assets.length; i++) {
        src = assets[i];
        if (src != undefined && !protocolRegEx.test(src)) {
            fileContents = fileContents.replace(src, src + '?hash=' + md5File.sync(fileRoot+"/"+src));
        }
    }

    return fileContents;
};

// Plugin level function(dealing with files)
var gulpHashCacheBuster = function(options)
{
    //if (!options) {
    //    throw new PluginError(PLUGIN_NAME, 'Missing options');
    //}

    // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb)
    {
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }

        var root = path.dirname(file.path);
        if (file.isBuffer())
        {
            file.contents = new Buffer(bust(root, file.contents.toString()));
        }
        if (file.isStream()) {
            //file.contents = file.contents.pipe(prefixStream(prefixText));
            throw new PluginError(PLUGIN_NAME, 'Streaming not supported');
        }

        cb(null, file);
    });
}

// Exporting the plugin main function
module.exports = gulpHashCacheBuster;