import { PROJECT_TAGS } from 'config/enums';
import { types, getRoot, flow } from 'mobx-state-tree';
import ipcc from 'ipcc/renderer';
import { prompt, confirmDelete } from 'config/swal';
import { toast } from 'config/swal';
import axios from 'axios';
import routes from 'config/routes';
import pify from 'pify';
import Swal from 'sweetalert2';

//icons
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';
import { faGithub, faGitlab, faBitbucket } from '@fortawesome/fontawesome-free-brands';

//utils
import { get, omitBy, omit, find } from 'lodash';
import { getProjectType } from 'project-utils/get-project-type';
import { getHttpsGitURL, isValidString } from 'utils/string-utils';
import uuid from 'uuid';
import gitBranch from 'utils/git-branch';
// import nodePlop from 'node-plop';

//models
import Tab from './Tab';
import Group from './Group';
import Process from './Process';

//native
import getFoldersAsObjects from 'utils/file-utils/get-folders-as-objects';
import getAllItems from 'utils/file-utils/get-all-items';
import { createModel } from 'utils/mst-utils';
import Boolean from 'models/Boolean';

//native
const fs = window.require('fs');
const path = window.require('path');
const { remote, shell } = window.require('electron');
const { spawn } = window.require('child_process');
const parseGitConfig = remote.require('parse-git-config');
const which = remote.require('which');
const nodePlop = remote.require('node-plop');
const rimraf = remote.require('rimraf');

const Generator = types.model({
  name: types.string,
  description: types.string
});

export default types
  .model('Project', {
    id: types.optional(types.identifier, () => uuid.v4()),
    group: types.maybeNull(types.reference(Group)),
    generatorList: types.optional(types.array(Generator), []),
    isWebBased: false,
    webUrl: '',
    name: '',
    path: '',
    type: '',
    allItems: types.optional(types.frozen(), []),
    tabs: types.optional(types.array(Tab), []),
    ready: true,
    editingScript: types.optional(types.string, ''),
    addingScript: createModel(Boolean),
    //frozen
    packageJson: types.frozen(),
    gitConfig: types.frozen(),
    gitBranch: types.frozen(),
    contents: types.frozen()
  })
  .actions(self => {
    let plop;

    return {
      edit: async () => {
        const store = getRoot(self);
        const editorExists = await ipcc.callMain('command-exists', store.settings.editor);
        if (editorExists) {
          const editor = which.sync(store.settings.editor);
          spawn(editor, ['.'], { cwd: self.path });
        } else {
          toast({
            type: 'error',
            title: `The cli "${store.settings.editor}" couldn't be found. Please make sure it's installed.`
          });
        }
      },
      setName: name => {
        self.name = name;
      },
      setReady: ready => {
        self.ready = ready;
        if (ready === true) {
          self.readProjectInfo();
        }
      },
      openDir: () => {
        // @see https://nodejs.org/dist/latest-v4.x/docs/api/os.html#os_os_platform
        switch (process.platform) {
          case 'darwin':
            spawn('open', [self.path]);
            break;
          case 'win32':
            spawn('explorer', [self.path]);
            break;
          case 'linux': // fallthrough
          case 'freebsd':
            spawn('xdg-open', [self.path]);
            break;
        }
      },
      build: () => {
        self.runScript('build');
      },
      deleteNodeModulesFolder: async (showToast = false) => {
        let nodeModulesPath = path.join(self.path, 'node_modules');
        const promise = pify(rimraf)(nodeModulesPath);
        if (showToast) {
          toast({ title: 'Successfully deleted the node_modules folder!', type: 'success' });
        }
        return promise;
      },
      installNodeModules: flow(function*() {
        const store = getRoot(self);
        yield self.runScript('install');
        store.createNotification('Done', `Dependencies for ${self.name} are installed.`);
      }),
      reinstallDependencies: flow(function*() {
        if (fs.existsSync(path.join(self.path, 'node_modules'))) {
          const confirmed = yield confirmDelete(
            'Are you sure?',
            `This will remove the node_modules folder and reinstall the dependencies again.`
          );
          if (confirmed) {
            yield self.deleteNodeModulesFolder(false);
            self.installNodeModules();
          }
        } else {
          yield self.deleteNodeModulesFolder(false);
          self.installNodeModules();
        }
      }),
      installDependency: flow(function*(formValues) {
        if (!formValues) {
          return null;
        }
        const { name, version, isDev = false } = formValues;

        if (name) {
          yield self.runScript('add', [`${name}${version ? `@${version}` : ''}`, isDev ? '--dev' : '--prod']);
          self.readProjectInfo();
        }
      }),
      deleteDependency: flow(function*(name) {
        const confirm = yield confirmDelete();
        if (confirm) {
          yield self.runScript('remove', [name]);
          self.readProjectInfo();
        }
      }),
      upgradeDependency: flow(function*(name) {
        self.runScript('upgrade', [`${name}@latest`]);
      }),
      setGroup(group) {
        self.group = group;
      },
      deleteScript: flow(function*(name) {
        const confirm = yield confirmDelete();
        if (confirm) {
          const newPackageJson = { ...self.packageJson, scripts: omit(self.packageJson.scripts, name) };
          self.updatePackageJson(newPackageJson);
        }
      }),
      toggleFavorite: flow(function*(name) {
        const current = self.packageJson.favoriteScripts || [];
        const favoriteScripts = current.includes(name) ? current.filter(n => n !== name) : [...current, name];
        const newPackageJson = {
          ...self.packageJson,
          favoriteScripts
        };
        self.updatePackageJson(newPackageJson);
      }),
      checkScriptFavorite: name => {
        return self.packageJson.favoriteScripts && self.packageJson.favoriteScripts.includes(name);
      },
      editScript: flow(function*(name) {
        self.editingScript = name;
      }),
      updateScript: flow(function*(newCommand, name, description) {
        let scriptsInfo = self.packageJson['scripts-info'];

        let descriptionIsValid = isValidString(description);
        let shouldModifyScriptsInfo = descriptionIsValid || (scriptsInfo && scriptsInfo[self.editingScript]);

        const sameName = name === self.editingScript;

        const newPackageJson = {
          ...self.packageJson,
          scripts: {
            ...(sameName
              ? self.packageJson.scripts
              : omit(self.packageJson.scripts, [name, self.editingScript])),
            [name]: newCommand
          },
          ...(shouldModifyScriptsInfo && {
            'scripts-info': {
              ...omit(scriptsInfo, [name, self.editingScript]),
              ...(descriptionIsValid && { [name]: description })
            }
          })
        };
        self.updatePackageJson(newPackageJson);
        self.editingScript = undefined;
        self.addingScript.setFalse();
      }),
      clearEditingScript: () => {
        self.editingScript = undefined;
      },
      moveDependency: flow(function*(name, version, isDev) {
        const packageJson = self.packageJson;
        const keys = isDev ? ['devDependencies', 'dependencies'] : ['dependencies', 'devDependencies'];
        const [moveFrom, moveTo] = keys;
        const newPackageJson = {
          ...packageJson,
          [moveFrom]: omit(packageJson[moveFrom], [name]),
          [moveTo]: { ...packageJson[moveTo], [name]: version }
        };
        self.packageJson = newPackageJson;
        const pkgPath = path.join(self.path, 'package.json');
        fs.writeFileSync(pkgPath, JSON.stringify(newPackageJson, null, 2));
      }),
      generate: flow(function*(generatorName) {
        const { value: name } = yield prompt('Name');
        if (name) {
          try {
            yield ipcc.callMain('run-plop-generator', {
              generatorName,
              actions: { name },
              projectPath: self.path
            });
            toast({ title: `Successfully generated "${name}"!`, type: 'success' });
            self.readContents();
          } catch (err) {
            toast({ title: `Couldn't generate file. Please try again.`, type: 'error' });
          }
        }
      }),
      showPluginSuccess(name) {
        toast({ title: `The plugin "${name}" has been successfully applied!`, type: 'success' });
      },
      updatePackageJson: newPackageJson => {
        const pkgPath = path.join(self.path, 'package.json');
        fs.writeFileSync(pkgPath, JSON.stringify(newPackageJson, null, 2));
        self.readProjectInfo();
      },
      applyPlugin: flow(function*(plugin) {
        if (plugin.actions) {
          yield ipcc.callMain('apply-plugin-actions', {
            actions: plugin.actions,
            dir: plugin.dir,
            projectPath: self.path
          });
          self.readProjectInfo();
          self.readContents();
        }

        const packageModify = plugin.packageModify;

        if (!packageModify) {
          self.showPluginSuccess(plugin.name);
          return false;
        }

        const {
          addScripts = [],
          removeScripts = [],
          addDependencies = [],
          addDevDependencies = [],
          removeDependencies = [],
          merge = {}
        } = packageModify;

        const { scripts, ...rest } = self.packageJson;

        const newPackageJson = {
          ...rest,
          scripts: { ...omitBy(scripts, removeScripts), ...addScripts },
          ...merge
        };

        self.updatePackageJson(newPackageJson);

        if (removeDependencies.length > 0) {
          yield self.addProcess('yarn', ['remove', ...removeDependencies]);
        }
        if (addDependencies.length > 0) {
          yield self.addProcess('yarn', ['add', ...addDependencies]);
        }
        if (addDevDependencies.length > 0) {
          yield self.addProcess('yarn', ['add', ...addDevDependencies, '--dev']);
        }

        self.showPluginSuccess(plugin.name);
      }),
      runScript: (scriptName, extraArgs = []) => {
        return self.addProcess('yarn', [scriptName, ...extraArgs]);
      },
      addProcess: async (cli, args) => {
        const store = getRoot(self);

        const proc = Process.create({ project: self });

        proc.attachStore(store);

        const prom = proc.attach(cli, args, self.path);
        store.processes.add(proc);
        prom.then(self.readProjectInfo);
        return prom;
      },
      start: () => {
        if (!self.isWebBased) {
          self.runScript(self.startScriptName || 'start');
        }
      },
      navigateThenStart: () => {
        const store = getRoot(self);
        if (store.settings.openProjectWhenRunning === true) {
          store.router.openPage(routes.project, { id: self.id });
          setTimeout(() => {
            self.start();
          }, 250);
        } else {
          self.start();
        }
      },
      navigate: () => {
        const store = getRoot(self);
        const project = self;
        const { router } = store;
        if (project.ready === false) {
          return Swal({
            title: 'The project is not ready yet, please wait.',
            text: 'The generator is still working.',
            type: 'warning'
          });
        }
        router.openPage(project.isWebBased ? routes.webProject : routes.project, { id: project.id });
      },
      deleteFromDisk: flow(function*() {
        const store = getRoot(self);

        const { value } = yield Swal({
          title: `This will delete the project from disk, are you sure?`,
          type: 'warning',
          showCancelButton: true
        });

        if (value === true) {
          console.log('deleting', self.path);
          rimraf.sync(self.path);
          store.removeProjectById(self.id);
          yield Swal({
            title: 'Successfully deleted project from disk!',
            type: 'success'
          });
        }
      }),
      clone: flow(function*() {
        const store = getRoot(self);
        store.setCloningProject(self);
      }),
      goToOrigin: () => {
        shell.openExternal(self.origin);
      },
      openWebUrl: () => {
        shell.openExternal(self.webUrl);
      },
      previewFile: () => {
        const store = getRoot(self);
        let openedFilePath = path.join(self.path, 'package.json');
        store.setOpenedFile(openedFilePath);
      },
      closeFile: () => {
        self.openedFile = null;
      },
      readContents: () => {
        const store = getRoot(self);
        if (store.settings.indexFiles === true) {
          try {
            self.contents = getFoldersAsObjects(self.path);
            self.allItems = getAllItems(self.path).map(i => ({
              ...i,
              projectPath: i.path.replace(`${self.path}/`, '')
            }));
          } catch (err) {
            console.error(err);
          }
        }
      },
      fetchGithubInfo: flow(function*(gitRepo) {
        const result = yield axios.get('https://api.github.com/repos/kitze/jsui');
        console.log('result, result', result);
      }),
      setProjectType: () => {
        self.type = getProjectType(self.packageJson, self.isWebBased, self.webUrl);
      },
      readProjectInfo: () => {
        console.log('read project info', self.name);

        const packageJsonPath = path.join(self.path, 'package.json');

        try {
          plop = nodePlop(path.join(self.path, 'plopfile.js'));
          let generators = plop.getGeneratorList();
          self.generatorList = generators.map(({ description, name }) => ({ name, description }));
        } catch (err) {
          console.log('err', err);
          self.generatorList = [];
        }

        try {
          self.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          self.setProjectType();
          self.startScriptName = ['start', 'dev', 'develop'].find(s => self.packageJson.scripts[s]);

          //origin
          const gitConfigPath = path.join(self.path, '.git/config');
          const gitConfig = parseGitConfig.sync({ cwd: 'foo', path: gitConfigPath });
          const url = get(gitConfig, 'remote "origin".url') || '';
          const gitRepoURL = getHttpsGitURL(url);
          console.log('giturl', url, gitRepoURL);
          self.origin = gitRepoURL;
        } catch (err) {
          console.error(err);
          self.type = PROJECT_TAGS.UNKNOWN;
        }

        try {
          self.gitBranch = gitBranch(self.path);
        } catch (err) {
          console.error(err);
        }
      },
      afterCreate() {
        if (self.isWebBased) {
          self.setProjectType();
        } else {
          self.readProjectInfo();
        }
      }
    };
  })
  .views(self => ({
    get gitIcon() {
      const originToIconMap = {
        gitlab: faGitlab,
        github: faGithub,
        bitbucket: faBitbucket
      };

      if (self.origin) {
        const foundIcon = find(originToIconMap, (value, key) => self.origin.includes(key));
        return foundIcon || faExternalLinkAlt;
      }
    }
  }));
