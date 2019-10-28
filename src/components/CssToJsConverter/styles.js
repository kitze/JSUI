import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { whiteish } from 'styles/mixins';

export const CssToJsConverter = emotion.div({
  padding: `15px 20px`,
  ...flex.vertical,
  flex: 1
});

export const Textarea = emotion.textarea({
  fontFamily: 'monospace',
  letterSpacing: '0.5px',
  lineHeight: '1.4',
  height: '100%',
  flex: 1,
  border: `1px solid ${whiteish(0.1)}`,
  backgroundColor: whiteish(0.05),
  color: whiteish(0.9),
  outline: 'none',
  borderRadius: 3,
  padding: 7,
  transition: 'all 150ms linear',
  '&::placeholder': {
    color: whiteish(0.5)
  },
  '&:focus': {
    backgroundColor: whiteish(0.07),
    border: `1px solid ${whiteish(0.13)}`
  }
});
