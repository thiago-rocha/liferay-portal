'use strict';

var config = require('../../../config');
var path = require('path');

var liferaySourceDir = path.resolve(config.liferaySourceDir);

module.exports = {
	normalizeContent: function(file, content) {
		// Normalize OSGI Web-ContextPath for fields

		if (/config\.js/.test(file.path)) {
			var path = file.path;

			path = path.replace('/js/config.js', '');
			path = path.replace('/config.js', '');

			content = content.replace(/MODULE_PATH/g, '\'' + path + '\'');
		}

		return content;
	},

	normalizePath: function(filePath) {
		if (filePath.indexOf(liferaySourceDir) === 0) {
			filePath = filePath.replace(liferaySourceDir, '/liferay');
		}

		return filePath;
	}
};