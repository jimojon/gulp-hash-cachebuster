# gulp-hash-cachebuster

Cachebusting plugin for [Gulp](https://github.com/gulpjs/gulp).

## Install

```
npm install npm install https://github.com/jonasmonnier/gulp-hash-cachebuster --save-dev
```

## Features

Parses html and uses the MD5-sum of a each asset as hash param.

```
<link rel="stylesheet" href="css/hello.css">
<script src="hello.js"></script>
```

Becomes
```
<link rel="stylesheet" href="css/hello.css?hash=08c84b1b1dbe491f09c7c566d7aa7e20">
<script src="hello.js?hash=b251ed91e4a2f97555dabf78b8266c77"></script>
```


## Use 
```
gulp.task('cachebust', function () {
    return gulp.src('./test/build/index.html')
        .pipe(cachebust())
        .pipe(gulp.dest('./test/build/'));
});
```

## Test 
```
npm install -g mocha
npm test
```