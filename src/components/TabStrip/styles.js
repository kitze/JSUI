import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { darken } from 'polished';

export const TabStrip = emotion.div({
  ...flex.horizontal,
  width: '100%'
});

const color = '#393939';

export const Tab = emotion.div(
  {
    ...flex.horizontal,
    ...flex.centerHorizontal,
    height: 30,
    color: 'white',
    fontSize: 11,
    minWidth: 120,
    userSelect: 'none',
    maxWidth: 200
  },
  ({ selected, disabled, withPadding = true } = {}) => ({
    ...(withPadding && {
      padding: '15px 12px'
    }),
    ...(!selected && {
      cursor: 'pointer',
      transition: 'all 100ms linear'
    }),
    backgroundColor: '#202020',
    ...(!disabled &&
      !selected && {
        '&:hover': {
          backgroundColor: '#292929'
        },
      }),
    ...(selected && {
      backgroundColor: color
    })
  })
);
