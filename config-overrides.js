const path = require('path');
const fs = require('fs');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireBabelLoader = require('react-app-rewire-babel-loader');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = function override(config, env) {
  let isDev = env === 'development';

  delete config.node;

  config.node = {
    __dirname: false,
    __filename: false
  };

  config.target = 'electron-renderer';

  config = injectBabelPlugin('babel-plugin-transform-decorators-legacy', config);
  config = injectBabelPlugin('babel-plugin-transform-do-expressions', config);
  config = injectBabelPlugin('babel-plugin-emotion', config);
  config = injectBabelPlugin('babel-plugin-preval', config);

  if (!isDev) {
    // config = injectBabelPlugin('transform-remove-console', config);
    config = rewireBabelLoader.include(
      config,
      resolveApp('node_modules/fix-path'),
      resolveApp('node_modules/shell-path'),
      resolveApp('node_modules/shell-env'),
      resolveApp('node_modules/npm-run-path'),
      resolveApp('node_modules/path-key'),
      resolveApp('node_modules/p-finally'),
      resolveApp('node_modules/default-shell'),
      resolveApp('node_modules/pify'),
      resolveApp('node_modules/transform-css-to-js'),
      resolveApp('node_modules/stringify-object')
    );
  }

  return config;
};
