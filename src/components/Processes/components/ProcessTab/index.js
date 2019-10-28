import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';

//emotion
import * as S from './styles';

import { faTimes } from '@fortawesome/fontawesome-free-solid';
import { PROCESS_STATUS } from 'config/enums';

class ProcessTab extends Component {
  static propTypes = {
    title: PropTypes.any.isRequired,
    status: PropTypes.string.isRequired,
    onStop: PropTypes.func.isRequired
  };

  onClick = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onStop();
    return false;
  };

  render() {
    const { title, tooltip, status } = this.props;

    return (
      <S.ProcessTab>
        {status !== PROCESS_STATUS.NONE && <S.Status status={status} />}
        <S.Title>
          <Tooltip title={tooltip || title}>{title}</Tooltip>
        </S.Title>
        <S.CloseCircle onClick={this.onClick}>
          <S.CloseIcon icon={faTimes} />
        </S.CloseCircle>
      </S.ProcessTab>
    );
  }
}

export default ProcessTab;
