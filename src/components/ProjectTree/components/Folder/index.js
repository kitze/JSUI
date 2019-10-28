import React, { Component } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { marginVertical } from 'styles/mixins';

//components
import Contents from '../Contents';
import flex from 'styles/flex';

//styles
export const Folder = styled.div({
  userSelect: 'none',
  ...marginVertical(5)
});

export const Title = styled.div({
  fontWeight: 400,
  transition: 'all 100ms linear',
  cursor: 'pointer',
  color: '#d6d6d6',
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  '&:hover': {
    backgroundColor: '#182328'
  }
});

export const Indicator = styled.span(
  {
    marginRight: 5,
    fontSize: 11,
    transition: 'all 100ms linear'
  },
  p => ({
    ...(p.opened && {
      transform: 'rotate(90deg)'
    })
  })
);

export const Name = styled.div({});

@observer
class FolderComponent extends Component {
  @observable opened = false;
  @action toggleOpened = () => (this.opened = !this.opened);

  render() {
    const {
      folder: { name, contents },
      onSelect
    } = this.props;

    return (
      <Folder>
        <Title onClick={this.toggleOpened}>
          <Indicator opened={this.opened}>▶</Indicator>
          <Name>{name}</Name>
        </Title>
        {this.opened && <Contents onSelect={onSelect} contents={contents} />}
      </Folder>
    );
  }
}

export default FolderComponent;
