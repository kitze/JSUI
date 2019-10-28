import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

//components
import App from './components/App';

//mobx
import { toJS } from 'mobx';
import Store from './models/store';
import { Provider } from 'mobx-react';
import { onSnapshot } from 'mobx-state-tree';
import { exportStore, importStore } from 'config/export-import-store';

//router
import { startRouter } from 'rttr';
import routes from 'config/routes';

//css
import './global-css';

//material-ui
import { create } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';

//codemirror
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/search/search');
require('codemirror/addon/search/searchcursor');

//create store
const eStore = window.require('electron').remote.require('electron-store');
const ElectronStore = new eStore();

//import store
const imported = importStore(ElectronStore);
const store = Store.create(imported);

//export store
onSnapshot(store, snapshot => {
  let nextStore = toJS(snapshot);
  ElectronStore.store = exportStore(nextStore);
});

startRouter(store.router, routes);

//material ui
const styleNode = document.createComment('insertion-point-jss');
document.head.insertBefore(styleNode, document.head.firstChild);
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = 'insertion-point-jss';

ReactDOM.render(
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <Provider store={store}>
      <App />
    </Provider>
  </JssProvider>,
  document.getElementById('root')
);
