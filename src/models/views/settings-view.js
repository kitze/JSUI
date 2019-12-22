import { types } from 'mobx-state-tree';
import { remote } from 'electron';
import { isEmptyString } from 'utils/string-utils';

let homepath = remote.app.getPath('home');

export default types
  .model('SettingsStore', {
    editor: 'code',
    projectsPath: types.optional(types.string, homepath),
    envPath: types.optional(types.string, homepath),
    indexFiles: types.optional(types.boolean, false),
    highlightProjectsWithoutRepo: types.optional(types.boolean, false),
    showHomeSidebar: types.optional(types.boolean, true),
    horizontalLayout: types.optional(types.boolean, false),
    automaticallyReleasePorts: types.optional(types.boolean, true),
    groupScriptsByPrefix: types.optional(types.boolean, true),
    showScriptsDescriptions: types.optional(types.boolean, true),
    showScriptsCommands: types.optional(types.boolean, true),
    labelScriptsCommands: types.optional(types.boolean, true),
    verticalScriptsLayout: types.optional(types.boolean, false),
    openProjectWhenRunning: types.optional(types.boolean, false)
  })
  .actions(self => ({
    setSettingValue: (valueKey, value) => {
      self[valueKey] = value;
    },
    changeEditor: editor => {
      self.editor = editor;
    },
    changePath: projectsPath => {
      self.projectsPath = projectsPath;
    },
    //toggle
    toggleHorizontalLayout: () => {
      self.horizontalLayout = !self.horizontalLayout;
    },
    toggleHomeSidebar: () => {
      self.showHomeSidebar = !self.showHomeSidebar;
    },
    //hooks
    afterCreate() {
      if (isEmptyString(self.projectsPath)) {
        self.projectsPath = homepath;
      }
    }
  }))
  .views(self => ({
    get valid() {
      return [self.editor, self.projectsPath].every(e => !isEmptyString(e));
    }
  }));
