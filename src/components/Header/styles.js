import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { colors } from 'styles/colors';

export const Header = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  ...flex.spaceBetween,
  width: '100%',
  minHeight: 50,
  // backgroundColor: colors.purple5,
  padding: 15,
  color: 'white'
});
