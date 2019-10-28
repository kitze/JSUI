import emotion from '@emotion/styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import flex from 'styles/flex';

export const Branch = emotion.div({
  fontSize: 14,
  ...flex.horizontal,
  ...flex.centerHorizontalV
});

export const Icon = emotion(FontAwesomeIcon)({
  color: 'white',
  marginRight: '5px',
});
