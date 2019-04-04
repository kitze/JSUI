import { configure } from '@storybook/react';

// const views = require.context('../src/views', true, /.stories\.js$/);
const components = require.context('../src/components', true, /.stories\.js$/);
// const styles = require.context('../src/styles', true, /.stories\.js$/);

const loadStories = arr => arr.forEach(req => req.keys().forEach(filename => req(filename)));

configure(() => [
  loadStories([components])
], module);
