export default () => {
  if (!!process.env.STORYBOOK_MODE) {
    return {};
  } else {
    const { remote } = require('electron');
    const plugins = remote.require('./plugins/index');
    return { plugins };
  }
};
