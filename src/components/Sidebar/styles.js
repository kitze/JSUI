import emotion from '@emotion/styled';
import flex from 'styles/flex';
import Scroll from 'react-scrollbars-custom';

export const Sidebar = emotion(Scroll)({
  ...flex.vertical,
  width: 260,
  height: '100vh',
  color: 'white',
  padding: 15,
  userSelect: 'none'
});
