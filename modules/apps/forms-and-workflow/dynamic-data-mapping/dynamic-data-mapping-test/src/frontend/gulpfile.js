'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

var registerUnitTestsTasks = require('./tasks/test-unit');

registerUnitTestsTasks();

gulp.task('test', function(done) {
	runSequence('test:unit', done);
});