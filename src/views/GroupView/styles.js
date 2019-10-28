import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { whiteish } from 'styles/mixins';
import { Button as $Button } from 'styles/shared-components';

export const GroupView = emotion.div({
  ...flex.vertical,
  color: 'white',
  flex: 1
});

export const Name = emotion.div({});

export const Button = emotion($Button)({
  padding: '7px 10px',
  fontSize: 13
});

export const Project = emotion.div({
  backgroundColor: whiteish(0.05),
  borderRadius: 5,
  padding: 15,
  minWidth: 200,
  flex: 1,
  marginRight: 15,
  marginBottom: 15,
  color: 'white',
  transition: 'all 150ms linear'
});
