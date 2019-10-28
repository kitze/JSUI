import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { size, whiteish } from 'styles/mixins';
import $ToggleIcon from 'components/ToggleIcon';
import * as A from 'styles/shared-components';

export const Icons = emotion(A.Horizontal)({
  opacity: 0,
  transition: 'opacity 150ms linear',
  position: 'absolute',
  top: 7,
  right: 7
});

export const ActionIcon = emotion(A.ActionIcon)({
  ...size(12)
}, ({favorite}) => ({
  ...favorite && {
    color: 'gold',
    '&:hover':{
      color: '#ff8d04',
    }
  }
}));

export const NpmScript = emotion.div(
  {
    position: 'relative',
    ...flex.vertical,
    backgroundColor: whiteish(0.05),
    borderRadius: 5,
    padding: '15px 10px',
    marginBottom: 15,
    color: 'white',
    marginRight: 10,
    transition: 'all 100ms linear',
    cursor: 'pointer',
    minWidth: 200,
    minHeight: 60,
    '&:hover': {
      transform: `scale(${1.01})`,
      backgroundColor: whiteish(0.1),
      [Icons]: {
        opacity: 1
      }
    }
  },
  ({ onlyName, horizontal }) => ({
    ...(onlyName && {
      ...flex.centerVertical
    }),
    ...horizontal && {
      ...flex.horizontal,
      ...flex.wrap,
      ...flex.centerHorizontalV,
    }
  })
);

export const Definition = emotion.div({});

export const ToggleIcon = emotion($ToggleIcon)({});

export const Name = emotion.div({
  fontSize: 15
});

export const Description = emotion.div({
  fontSize: 14,
  color: whiteish(0.7)
});
