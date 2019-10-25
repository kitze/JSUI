import emotion from 'react-emotion';
import flex from 'styles/flex';
import { noSelect, whiteish } from 'styles/mixins';

export const MiniTabs = emotion.div(
  {
    ...flex.horizontal,
    overflowX: 'auto',
    color: 'white'
  },
  ({ small }) => ({
    ...(small && {
      minHeight: 25,
      height: 25,
      fontSize: 12
    }),
    ...(!small && {
      minHeight: 35
    })
  })
);

const borderColor = whiteish(0.3);
const borderStyle = `1px solid ${borderColor}`;
const borderRadius = 4;

export const Tab = emotion.div(
  {
    ...flex.vertical,
    ...flex.centerVertical,
    ...noSelect,
    borderRight: borderStyle,
    borderTop: borderStyle,
    borderBottom: borderStyle,
    transition: 'all 100ms linear',
    textAlign: 'center',
    cursor: 'pointer',
    overflow: 'hidden',

    '&:first-child': {
      borderTopLeftRadius: borderRadius,
      borderBottomLeftRadius: borderRadius,
      borderLeft: borderStyle
    },
    '&:last-child': {
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    }
  },
  ({ active, small }) => ({
    ...(active && {
      backgroundColor: whiteish(0.2),
    }),
    ...(!active && {
      '&:hover': {
        backgroundColor: whiteish(0.05)
      }
    }),
    ...(small && {
      padding: small ? '5px 6px' : '5px 10px'
    })
  })
);
