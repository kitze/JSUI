import React from 'react';
import emotion from '@emotion/styled';
import { Tooltip } from 'react-tippy';

import ConditionalWrap from 'conditional-wrap';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { whiteish } from 'styles/mixins';

export const Icon = emotion(FontAwesomeIcon)(
  {
    color: whiteish(0.7),
    cursor: 'pointer',
    transition: 'color 150ms linear',
    '&:hover': {
      color: whiteish(0.8)
    },
    '&:active': {
      color: whiteish(1)
    }
  },
  ({ inactive }) => ({
    ...(inactive && {
      color: whiteish(0.3)
    })
  })
);

export default ({ onIcon, offIcon, tip, active, ...rest }) => (
  <ConditionalWrap condition={tip} wrap={children => <Tooltip title={tip}> {children}</Tooltip>}>
    <Icon {...rest} icon={active ? onIcon : offIcon} />
  </ConditionalWrap>
);
