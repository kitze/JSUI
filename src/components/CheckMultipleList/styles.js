import emotion from '@emotion/styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { whiteish } from 'styles/mixins';

export const Checkbox = emotion(FontAwesomeIcon)();

export const CheckMultipleList = emotion.div();

export const Item = emotion.div({
  cursor: 'pointer',
  marginLeft: '-2rem',
  marginRight: '-2rem',
  padding: '.3rem 2rem',
  '&:hover': {
    backgroundColor: whiteish(0.07)
  }
});

export const Name = emotion.div({
  color: 'white',
  fontSize: 14,
  userSelect: 'none'
});
