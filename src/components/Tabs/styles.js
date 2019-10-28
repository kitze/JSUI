import emotion from '@emotion/styled';
import flex from 'styles/flex';

export const Tabs = emotion.div({
  ...flex.vertical,
  width: '100%',
  flex: 1
});

export const RightSide = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  padding: '0 15px'
});

export const Bar = emotion.div({
  ...flex.horizontal,
  ...flex.spaceBetween
});
