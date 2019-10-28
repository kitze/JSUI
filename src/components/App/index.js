import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import ipcc from 'ipcc/renderer';
import { hot } from 'react-hot-loader/root';
//styles
import * as S from './styles';

//components
import Home from 'views/Home';
import Dialogs from 'components/Dialogs';
import Processes from 'components/Processes';

import { executeShortcut } from 'config/shortcuts';

@inject('store')
@observer
class App extends Component {
  componentDidMount() {
    const { store } = this.props;
    ipcc.answerMain('execute-shortcut', shortcut => executeShortcut(shortcut, store));
    ipcc.answerMain('set-focused', focus => store.focused.setValue(focus));
  }

  render() {
    const { store } = this.props;
    const { router, processes } = store;
    const showHomePage = !router.page || router.page === 'home';

    return (
      <S.App>
        {showHomePage ? <Home /> : router.extra ? router.extra.component : null}
        <Dialogs />
        {/*<Footer />*/}
        {store.processes.hasProcesses && <Processes processes={processes} />}
      </S.App>
    );
  }
}

export default hot(App);
