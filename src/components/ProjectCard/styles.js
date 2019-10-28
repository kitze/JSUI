import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { fixedHeight, fixedWidth, size, whiteish } from 'styles/mixins';
import { sample } from 'lodash';
import * as A from 'styles/shared-components';

//components
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import IconWithTip from 'components/IconWithTip';
import { debug } from 'config/debug';

const sectionPadding = 12;
const fabSize = 40;
const fabOffset = -(sectionPadding + fabSize / 2);
const topHeight = 50;
const minCardWidth = 250;
const minCardHeight = 100;

export const Background = emotion.div({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  transition: 'all 150ms linear',
  backgroundColor: whiteish(0.1)
});

export const Fab = emotion.div({
  ...flex.vertical,
  ...flex.centerVertical,
  ...fixedWidth(fabSize),
  ...fixedHeight(fabSize),
  backgroundColor: '#6b7abd',
  cursor: 'pointer',
  borderRadius: '100%',
  position: 'relative',
  top: fabOffset,
  marginBottom: fabOffset,
  transition: 'all 150ms linear',
  opacity: 0,
  transform: 'translateY(10px)',
  '&:hover': {
    backgroundColor: '#5b68a3'
  }
});

export const IconRow = emotion.div(
  {
    ...flex.horizontal,
    ...flex.spaceBetween,
    transition: 'all 100ms linear',
    borderRadius: 3,
    width: '100%',
    opacity: 0.3,
    padding: 3
  },
  ({ alwaysShow }) => ({
    ...(alwaysShow && {
      opacity: 1
    })
  })
);

export const TopContent = emotion.div({
  position: 'relative',
  zIndex: 1
});

export const DotsWrap = emotion.div({
  ...flex.horizontal,
  ...flex.justifyEnd,
  width: 20
});

export const Top = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  position: 'relative',
  height: topHeight,
  color: 'white',
  padding: sectionPadding,
  overflow: 'hidden',
  transition: 'all 200ms ease-in'
});

const maxCardWidth = 330;
export const ProjectCard = emotion.div(
  {
    position: 'relative',
    zIndex: 3,
    ...flex.vertical,
    display: 'flex',
    borderRadius: 5,
    overflow: 'hidden',
    minWidth: minCardWidth,
    minHeight: minCardHeight,
    maxWidth: maxCardWidth,
    marginBottom: 15,
    backgroundColor: whiteish(0.03),
    border: `1px solid ${whiteish(0.3)}`,
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      [IconRow]: {
        opacity: 1
      },
      [Background]: {
        transform: 'scale(1.05)'
      },
      [Fab]: {
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  },
  ({ markRed, horizontal }) => ({
    ...(markRed &&
      {
        // border: '1px solid #ea9797'
      }),
    ...(horizontal && {
      width: '100%'
    }),
    ...(!horizontal && {
      marginRight: 15
    })
  })
);

export const Info = emotion.div({
  ...flex.vertical,
  color: whiteish(0.8),
  fontSize: 13,
  paddingBottom: 2,
  transition: 'all 100ms linear',
  borderBottom: '1px solid rgba(0,0,0,0)',
  '&:hover': {
    borderBottom: '1px solid gray'
  }
});

export const ActionIcon = emotion(IconWithTip)({});

export const Bottom = emotion.div({
  ...flex.vertical,
  padding: sectionPadding
});

export const PlayIcon = emotion(FontAwesomeIcon)({
  ...size(15),
  color: 'white'
});

export const Icon = emotion(FontAwesomeIcon)(
  {
    ...size(18),
    cursor: 'pointer'
  },
  ({ color }) => ({
    color: color || 'white'
  })
);

export const Name = emotion.div({});

export const Tag = emotion.div({
  ...flex.vertical,
  ...flex.centerVertical,
  backgroundColor: '#6c86fb',
  padding: '3px 5px',
  borderRadius: 3,
  fontSize: 12,
  color: 'white',
  flexShrink: 0,
  minHeight: 19,
  maxHeight: 19,
  height: 19
});
