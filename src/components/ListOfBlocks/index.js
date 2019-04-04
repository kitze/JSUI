import React, { Component } from 'react';
import map from 'lodash/map';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

class ListOfBlocks extends Component {
  render() {
    const { onPick, list } = this.props;

    return (
      <S.ListOfBlocks>
        {map(list, item => (
          <A.Block.Wrap onClick={() => onPick(item)}>
            <A.Block.Name>{item.title || item.name}</A.Block.Name>
            <A.Block.Description>{item.description}</A.Block.Description>
          </A.Block.Wrap>
        ))}
      </S.ListOfBlocks>
    );
  }
}

export default ListOfBlocks;
