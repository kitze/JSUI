import emotion from '@emotion/styled';
import flex from 'styles/flex';
import { whiteish } from 'styles/mixins';
import * as A from 'styles/shared-components';

export const Groups = emotion.div({
  ...flex.vertical,
  width: '100%'
});

export const ScriptsManager = emotion.div({});

export const AddScript = emotion(A.Horizontal)({
  ...flex.horizontal,
  ...flex.centerHorizontal,
  backgroundColor: whiteish(0.05),
  borderRadius: 5,
  padding: 15,
  marginBottom: 15,
  width: 160,
  height: 70,
  fontSize: 15,
  color: 'white',
  cursor: 'pointer',
  transition: 'all 100ms linear',
  border: `2px dashed ${whiteish(0.2)}`,
  '&:hover': {
    backgroundColor: whiteish(0.07),
    transform: `scale(1.01)`
  }
});

export const Title = emotion.div({
  color: 'white',
  fontSize: 18
});
