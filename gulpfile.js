'use strict';
// this gulp file is used to automate some tasks such as build
// - transpile the ts files to js files and


const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');
const runSequence = require('run-sequence');
const path = require('path');
const mocha = require('gulp-mocha');

gulp.task('tsTranspiler', function () {
    // the following task transiples the ts files in project
    let tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return merge([
        tsResult.js.pipe(sourcemaps.write({
            sourceRoot: function (file) {
            let sourceFile = path.join(file.cwd, file.sourceMap.file);
            return path.relative(path.dirname(sourceFile), file.cwd);
        }})),
        tsResult.js.pipe(gulp.dest(''))]);
    // tsResult.dts.pipe(gulp.dest('typings'))]);
});


// Mocha tests task
gulp.task('mocha', function (done) {
    // Run the tests
    gulp.src(['test/*.js'], {read: false})
     .pipe(mocha())
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });
});



gulp.task('build', function (done) {
    runSequence('tsTranspiler', done);
});

gulp.task('test', function (done) {
    runSequence('mocha', done);
});


gulp.task('watch-test', function () {
    gulp.watch(['test/**'], ['test']);
});