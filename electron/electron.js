const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const unhandled = require('electron-unhandled');
const pify = require('pify');
const ipc = require('electron-better-ipc');
const logger = require('electron-timber');
const { app, dialog, Menu, BrowserWindow } = electron;
const { sync } = require('command-exists');
const nodePlop = require('node-plop');
const fs = require('fs');
const format = require('date-fns/format');

/* ================= LOCAL MODULES ===================== */

const buildMenu = require('./build-menu');
const applyPlugin = require('./apply-plugin');
const { CALLS, SHORTCUTS } = require('./enums');
const initAutoUpdate = require('update-electron-app');

/* ======================= DEV ======================= */

require('electron-debug')({ enabled: true, showDevTools: false });
unhandled();

/* ======================= AUTO UPDATE ==================== */

initAutoUpdate({
  repo: 'kitze/jsui'
});

/* ======================= STORE ======================= */

const Store = require('electron-store');
const ElectronStore = new Store();

/* ======================= URL ======================= */

const localUrl = 'http://localhost:3000';
const buildUrl = `file://${path.join(__dirname, '../build/index.html')}`;
const appUrl = isDev ? localUrl : buildUrl;

/* ======================= GLOBALS ======================= */

let mainWindow;

/* ======================= METHODS ======================= */

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#3e495e',
    webPreferences: {
      devTools: isDev,
      webviewTag: true,
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(appUrl);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
};

const onOpenDialog = async options => {
  const dialogAsync = pify(dialog.showOpenDialog(mainWindow, options || { properties: ['openDirectory'] }));
  const chosenFolders = await dialogAsync;
  return chosenFolders[0];
};

const setupListeners = () => {
  ipc.answerRenderer('open-dialog', onOpenDialog);
  ipc.answerRenderer('import-config', importConfig);

  ipc.answerRenderer('apply-plugin-actions', applyPlugin);

  ipc.answerRenderer('command-exists', async command => {
    const result = await sync(command);
    return !!result;
  });

  ipc.answerRenderer('run-plop-generator', async ({ generatorName, actions, projectPath }) => {
    const plop = nodePlop(path.join(projectPath, 'plopfile.js'));
    return plop.getGenerator(generatorName).runActions(actions);
  });
};

const callShortcut = shortcut => ipc.callRenderer(mainWindow, CALLS.SHORTCUT, shortcut);

const resetCache = () => {
  ElectronStore.clear();
  mainWindow.webContents.reload();
};

const editCache = () => {
  ElectronStore.openInEditor();
};

const importConfig = async () => {
  try {
    const dialogAsync = pify(dialog.showOpenDialog(mainWindow, { properties: ['openFile'] }));
    const chosenFiles = await dialogAsync;
    if (chosenFiles) {
      ElectronStore.store = JSON.parse(fs.readFileSync(chosenFiles[0], 'utf-8'));
      mainWindow.webContents.reload();
    }
  } catch (err) {
    logger.log(err);
  }
};

const exportConfig = async () => {
  try {
    const dialogAsync = pify(dialog.showOpenDialog(mainWindow, { properties: ['openDirectory'] }));
    const chosenFolders = await dialogAsync;
    if (chosenFolders) {
      const date = format(new Date(), 'MM-DD-YYYY HH[:]mm');
      fs.writeFileSync(
        path.join(chosenFolders[0], `jsui-config (${date}).json`),
        JSON.stringify(ElectronStore.store)
      );
    }
  } catch (err) {
    logger.log(err);
  }
};

const createMenu = () => {
  const menuTemplate = buildMenu({
    config: {
      appName: app.getName()
    },
    methods: {
      importConfig,
      exportConfig,
      resetCache,
      editCache,
      callShortcut
    }
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

/* ======================= APP EVENTS ======================= */

app.on('ready', () => {
  createWindow();
  setupListeners();
  createMenu();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('browser-window-blur', () => ipc.callRenderer(mainWindow, 'set-focused', false));

app.on('browser-window-focus', () => ipc.callRenderer(mainWindow, 'set-focused', true));
