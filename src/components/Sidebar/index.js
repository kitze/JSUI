import React, {Component} from 'react';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

class Sidebar extends Component {
  render() {
    const {children} = this.props;
    return (
      <S.Sidebar noScrollX>
        {children}
      </S.Sidebar>
    )
  }
}

export default Sidebar;
