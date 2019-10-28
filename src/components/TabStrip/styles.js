import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { getActionColors } from 'styles/mixins';

export const TabStrip = emotion.div({
  ...flex.horizontal,
  width: '100%'
});

export const Tab = emotion.div(
  {
    ...flex.horizontal,
    ...flex.centerHorizontal,
    borderRight: '1px solid #484848',
    height: '30',
    color: 'white',
    fontSize: 11,
    minWidth: 120,
    userSelect: 'none',
    maxWidth: 200
  },
  ({ selected, withPadding = true } = {}) => ({
    ...(withPadding && {
      padding: '15px 12px'
    }),
    ...(!selected && {
      cursor: 'pointer',
      transition: 'all 100ms linear'
    })
  }),
  getActionColors('gray', 'selected')
);
