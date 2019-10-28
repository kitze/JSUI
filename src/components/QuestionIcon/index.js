import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import emotion from '@emotion/styled';
import { Tooltip } from 'react-tippy';
import { faQuestion } from '@fortawesome/fontawesome-free-solid';
import flex from 'styles/flex';
import { fixedSize, whiteish } from 'styles/mixins';

export const Wrap = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontal,
  ...fixedSize(13),
  borderRadius: 5,
  cursor: 'pointer',
  backgroundColor: whiteish(0.2),
  transition: 'all 100ms lienar',
  '&:hover': {
    backgroundColor: whiteish(0.3)
  }
});

export const Icon = emotion(FontAwesomeIcon)({
  ...fixedSize(7)
});

const QuestionIcon = ({ tip }) => (
  <Tooltip title={tip}>
    <Wrap>
      <Icon icon={faQuestion} />
    </Wrap>
  </Tooltip>
);

export default QuestionIcon;
