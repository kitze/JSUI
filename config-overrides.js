const path = require('path');
const fs = require('fs');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const enableEslintIgnore = require('customize-cra-eslint-ignore');
const { override, addBabelPlugins, addDecoratorsLegacy, babelInclude } = require('customize-cra');

const isProduction = process.env.NODE_ENV !== 'development';
console.log('Creating a build for: ', isProduction ? 'Production' : 'Development');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (config, env) => {
  config = override(
    enableEslintIgnore(),
    ...addBabelPlugins(
      'babel-plugin-emotion',
      'babel-plugin-preval',
      'babel-plugin-transform-do-expressions'
    ),
    addDecoratorsLegacy(),
    babelInclude([resolveApp('src')])
  )(config);

  config.target = 'electron-renderer';
  config = rewireReactHotLoader(config, env);
  return config;
};
