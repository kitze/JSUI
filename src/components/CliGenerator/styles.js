import emotion from '@emotion/styled';
import flex from 'styles/flex';

export const CliGenerator = emotion.div({
  flex: 1,
  ...flex.vertical,
  padding: '25px 25px'
});

export const Title = emotion.div({
  fontSize: 20,
  fontWeight: 600,
  marginBottom: 20
});

export const Subtitle = emotion.div({
  fontSize: 16,
  fontWeight: 300,
  marginBottom: 20
});

export const Form = emotion.div({
  ...flex.vertical
});
