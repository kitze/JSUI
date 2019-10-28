import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { whiteish } from 'styles/mixins';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export const Icon = emotion(FontAwesomeIcon)({
  fontSize: 12
});

export const ScriptCommand = emotion.div(
  {
    ...flex.vertical,
    ...flex.centerVerticalV,
    backgroundColor: whiteish(0.1),
    padding: 5,
    fontSize: 12,
    marginRight: 7,
    borderRadius: 4,
    transition: 'all 100ms linear',
    cursor: 'default'
  },
  ({ highlighted, hidden, styles }) => ({
    ...(highlighted && {
      backgroundColor: whiteish(0.2),
      transform: `scale(${1.05})`
    }),
    ...(hidden && {
      opacity: 0.3
    }),
    ...styles,
    ...(!styles && {
      '&:hover': {
        backgroundColor: whiteish(0.15)
      }
    })
  })
);
