# gulp-hash-cachebuster 

Cachebusting plugin for [Gulp](https://github.com/gulpjs/gulp).  

[![Build Status](https://travis-ci.org/jonasmonnier/gulp-hash-cachebuster.svg?branch=master)](https://travis-ci.org/jonasmonnier/gulp-hash-cachebuster) [![Dependency Status](https://gemnasium.com/badges/github.com/jonasmonnier/gulp-hash-cachebuster.svg)](https://gemnasium.com/github.com/jonasmonnier/gulp-hash-cachebuster)

## Install

```
npm install gulp-hash-cachebuster --save-dev
```

## Features

Parses html and uses the MD5-sum of each asset as hash param.

```html
<link rel="stylesheet" href="css/hello.css">
<script src="hello.js"></script>
```

Becomes
```html
<link rel="stylesheet" href="css/hello.css?hash=08c84b1b1dbe491f09c7c566d7aa7e20">
<script src="hello.js?hash=b251ed91e4a2f97555dabf78b8266c77"></script>
```


## Use 
```js
var gulp = require('gulp');  
var gutil = require('gulp-util');
var cachebust = require('gulp-hash-cachebuster');  

gulp.task('cachebust', function () {
    return gulp.src('./build/*.html')
        .pipe(cachebust())
        .on("warning", function(message){
            // Log missing assets
            gutil.log(gutil.colors.red(message));
        })
        .pipe(gulp.dest('./build/'));
});
```

## Test 
```
npm install -g mocha
npm test
```