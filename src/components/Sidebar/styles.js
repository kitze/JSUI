import emotion from 'react-emotion';
import flex from 'styles/flex';
import Scroll from 'react-scrollbars-custom';

export const Sidebar = emotion(Scroll)({
  ...flex.vertical,
  width: 260,
  // backgroundColor: '#1b1d2a',
  height: '100vh',
  color: 'white',
  padding: 15
});
