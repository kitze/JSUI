import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Scroll from 'react-scrollbars-custom';

//styles
import * as S from './styles';

//components
import Contents from './components/Contents';

@inject('store')
@observer
class ProjectTree extends Component {
  render() {
    const { contents, selectedFilePath, store } = this.props;
    return (
      <S.ProjectTree>
        <Scroll style={{flex: 1}}>
          <Contents onSelect={store.setOpenedFile} selectedFilePath={selectedFilePath} contents={contents} />
        </Scroll>
      </S.ProjectTree>
    );
  }
}

export default ProjectTree;
