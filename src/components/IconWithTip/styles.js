import emotion from '@emotion/styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { size, hoverable } from 'styles/mixins';

export const Icon = emotion(FontAwesomeIcon)(
  {
    ...size(20),
    cursor: 'pointer'
  },
  hoverable
);
