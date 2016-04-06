'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
var merge = require('merge');
var openFile = require('open');
var path = require('path');

module.exports = function() {
	gulp.task(
		'test:unit',
		[],
		function(done) {
			runKarma({}, done);
		}
	);

	gulp.task(
		'test:unit:coverage',
		[],
		function(done) {
			runKarma(
				{
					configFile: path.resolve(__dirname, '../tests/unit/karma-coverage.conf.js'),
					coverage: true
				},
				function() {
					done();
				}
			);
		}
	);

	gulp.task(
		'test:unit:coverage:open',
		['test:unit:coverage'],
		function(done) {
			openFile(path.resolve(__dirname, '../tests/unit/coverage/lcov/lcov-report/index.html'));
			done();
		}
	);

	gulp.task(
		'test:unit:browsers',
		[],
		function(done) {
			runKarma(
				{
					browsers: ['Chrome', 'Firefox', 'Safari']
				},
				done
			);
		}
	);

	gulp.task(
		'test:unit:watch',
		[],
		function(done) {
			runKarma(
				{
					singleRun: false
				},
				done
			);
		}
	);
};

// Private helpers
// ===============

function runKarma(config, done) {
	config = merge(
		{
			configFile: path.resolve(__dirname, '../tests/unit/karma.conf.js'),
			singleRun: true
		},
		config
	);

	karma.start(
		config,
		function(exitCode) {
			if (exitCode) {
				console.log('Tests failed.');
			}

			done();
		}
	);
}