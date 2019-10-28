import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from '@emotion/styled';
import { marginVertical } from 'styles/mixins';

export const File = styled.div(
  {
    ...marginVertical(10),
    paddingLeft: 5,
    paddingRight: 5,
    transition: 'all 100ms linear',
    cursor: 'pointer',
    color: '#d6d6d6',
    '&:hover': {
      backgroundColor: '#182328'
    }
  },
  ({ isSelected }) => ({
    ...(isSelected && {
      color: 'white',
      backgroundColor: '#182328'
    })
  })
);

@observer
class FileComponent extends Component {
  render() {
    const { file, isSelected, onSelect } = this.props;

    return (
      <File isSelected={isSelected} onClick={onSelect}>
        {file.name}
      </File>
    );
  }
}

export default FileComponent;
