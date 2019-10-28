import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { colors } from 'styles/colors';

export const Footer = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  height: 25,
  backgroundColor: colors.purple5,
  padding: 15,
  fontSize: 14,
  color: 'white'
});
