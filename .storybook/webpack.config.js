const rewire = require('../config-overrides');

module.exports = function override(config) {
  config = rewire(config);

  delete config.target;
  delete config.node;

  config.module.rules.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
  });
  return config;
};
