import emotion from '@emotion/styled';
import { whiteish } from 'styles/mixins';
import flex from 'styles/flex';
import { fixedHeight } from 'styles/mixins';

export const PopupSelector = emotion.div({});

export const Search = emotion.div({
  backgroundColor: '#1f1f1f',
  ...flex.vertical
});

export const Items = emotion.div({
  ...fixedHeight(450),
  overflowY: 'auto',
  position: 'relative'
});

let commonPadding = '10px';

export const Item = emotion.div(
  {
    ...flex.horizontal,
    ...flex.centerHorizontalV,
    height: 60,
    padding: commonPadding,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 70ms linear'
  },
  ({ isSelected, isHighlighted }) => ({
    ...(isHighlighted && {
      backgroundColor: whiteish(0.1)
    })
  })
);

export const Input = emotion.input({
  ...fixedHeight(60),
  backgroundColor: whiteish(0.05),
  color: 'white',
  padding: commonPadding,
  fontSize: 15,
  outline: 'none',
  border: 'none',
  '&::placeholder': {
    color: whiteish(0.7)
  },
  '&:focus': {
    backgroundColor: whiteish(0.01)
  }
});
