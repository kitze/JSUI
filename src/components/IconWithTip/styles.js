import emotion from '@emotion/styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { size, hoverable } from 'styles/mixins';
import flex from 'styles/flex';

export const Icon = emotion(FontAwesomeIcon)(
  {
    ...flex.vertical,
    ...flex.centerVertical,
    ...size(20),
    cursor: 'pointer'
  },
  hoverable
);
