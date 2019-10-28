import emotion from '@emotion/styled';
import { whiteish } from 'styles/mixins';
import flex from 'styles/flex';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { Horizontal } from 'styles/flex-components';

export const DependenciesList = emotion.div({});

export const Icons = emotion(Horizontal)({
  marginLeft: 15,
  display: 'none',
  opacity: 1,
  transition: 'all 100ms linear'
});

export const Dependency = {
  Name: emotion.div({
    color: 'white'
  }),
  Wrap: emotion.div({
    ...flex.horizontal,
    ...flex.centerHorizontalV,
    ...flex.spaceBetween,
    fontSize: 14,
    padding: `2px 5px`,
    borderRadius: 3,
    transition: 'all 100ms linear',
    minWidth: 300,
    minHeight: 30,
    '&:hover': {
      backgroundColor: whiteish(0.05),
      [Icons]: {
        display: 'flex',
        opacity: 1
      }
    }
  })
};

export const SmallIcon = {
  Button: emotion.div({
    ...flex.horizontal,
    ...flex.centerHorizontal,
    cursor: 'pointer',
    padding: '5px 5px',
    transition: 'all 100ms linear',
    backgroundColor: whiteish(0.05),
    border: `1px solid ${whiteish(0.1)}`,
    borderRadius: 3,
    '&:hover': {
      backgroundColor: whiteish(0.1)
    }
  }),
  Icon: emotion(FontAwesomeIcon)({
    color: 'white',
    width: 9,
    height: 9
  })
};
