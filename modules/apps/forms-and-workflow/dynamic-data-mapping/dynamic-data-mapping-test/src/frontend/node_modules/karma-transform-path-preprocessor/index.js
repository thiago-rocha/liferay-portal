var createPreprocessor = function(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.transformPath');

  var defaultOptions = {
    sourceMaps: false
  };

  var options = helper.merge(defaultOptions, args.options || {}, config.options || {});

  var transformer = args.transformer || config.transformer || function(filePath) {
    return filePath;
  };

  return function(content, file, done) {
    log.debug('Processing "%s".', file.originalPath);

    file.path = transformer(file.originalPath);

    return done(null, content);
  };
};

createPreprocessor.$inject = ['args', 'config.transformPathPreprocessor', 'logger', 'helper'];

module.exports = {
  'preprocessor:transformPath': ['factory', createPreprocessor]
};