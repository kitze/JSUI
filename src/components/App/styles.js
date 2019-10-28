import emotion from '@emotion/styled';
import flex from 'styles/flex';

export const App = emotion.div({
  ...flex.vertical,
  flex: 1,
  width: '100vw',
  height: '100vh',
  maxHeight: '100vh',
  maxWidth: '100vw',
  overflowY: 'hidden',
  // backgroundColor: '#343f55'
});
