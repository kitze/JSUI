import emotion from '@emotion/styled';
import { whiteish } from 'styles/mixins';
import flex from 'styles/flex';
import { fixedHeight } from 'styles/mixins';
import { colors } from 'styles/colors';

export const PopupSelector = emotion.div({});

export const Search = emotion.div({
  backgroundColor: colors.purple1,
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
    userSelect: 'none'
  },
  ({ isSelected, isHighlighted }) => ({
    ...(isHighlighted && {
      backgroundColor: colors.purple3
    })
  })
);

export const Input = emotion.input({
  ...fixedHeight(60),
  backgroundColor: whiteish(0.2),
  color: 'white',
  padding: commonPadding,
  fontSize: 15,
  border: `1px solid ${whiteish(0.5)}`,
  outline: 'none',
  '&::placeholder': {
    color: whiteish(0.7)
  },
  '&:focus': {
    backgroundColor: whiteish(0.3),
    border: `1px solid ${whiteish(0.4)}`
  }
});
