import emotion from '@emotion/styled';
import flex from 'styles/flex';

export const ListOfBlocks = emotion.div({
  ...flex.vertical,
  flex: 1,
  overflowY: 'scroll'
});

