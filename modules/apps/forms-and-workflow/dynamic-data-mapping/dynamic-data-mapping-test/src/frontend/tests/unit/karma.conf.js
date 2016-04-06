var normalizer = require('./util/normalizer');
var resolveDependencies = require('./util/dependencies');

module.exports = function(karmaConfig) {
	resolveDependencies(
		function(files) {
			karmaConfig.set(
				{
					browsers: ['Chrome'],

					frameworks: ['chai', 'commonjs', 'mocha', 'sinon'],

					files: files.concat(
						[
							'src/**/*.js',
							'src/**/*.json'
						]
					),

					reporters: ['mocha'],

					preprocessors: {
						'/**/*.css': ['transformPath'],
						'/**/*.js': ['transformPath', 'replacer'],
						'mocks/*.js': ['replacer'],
						'src/**/*.js': ['commonjs']
					},

					replacerPreprocessor: {
						replacer: normalizer.normalizeContent
					},

					transformPathPreprocessor: {
						transformer: normalizer.normalizePath
					}
				}
			);
		}
	);
};