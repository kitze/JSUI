import React, { Component } from 'react';
import { inject, observer, Provider } from 'mobx-react';
import map from 'lodash/map';
import { types } from 'mobx-state-tree';
import groupBy from 'lodash/groupBy';
import partition from 'lodash/partition';
import { faCog, faPlus, faTimes } from '@fortawesome/fontawesome-free-solid';
import { FormControlLabel, Switch } from '@material-ui/core';
//styles
import * as S from './styles';
import * as A from 'styles/shared-components';
import Boolean from 'models/Boolean';
import String from 'models/String';
//component
import { createModel } from 'utils/mst-utils';
import ScriptsGroup from 'components/ScriptsGroup';
import IconWithTip from 'components/IconWithTip';
import Dialog from 'components/Dialog';
import { LabelClasses } from 'styles/material-ui-overrides';
import { bindSettingToSwitch } from 'utils/bind-utils';
import ScriptsList from 'components/ScriptsManager/components/ScriptsList';
import ScriptEditingDialog from 'components/ScriptEditingDialog';
import get from 'lodash/get';

const ScriptsStore = types.model('ScriptsStore', {
  compact: createModel(Boolean),
  highlightedCommand: createModel(String)
});

const scriptsStore = ScriptsStore.create();

@inject('store')
@observer
class ScriptsManager extends Component {
  showSettings = Boolean.create();

  render() {
    const { packageJson, store } = this.props;
    const { settings, currentProject: project } = store;

    const list = map(packageJson.scripts, (definition, name) => {
      return {
        name,
        definition,
        description: packageJson['scripts-info'] && packageJson['scripts-info'][name]
      };
    });

    const favorites = packageJson.favoriteScripts || [];

    const [withHooks, withoutHooks] = partition(list, item => {
      let hasAPre = packageJson.scripts[`pre${item.name}`];
      let hasAPost = packageJson.scripts[`post${item.name}`];
      let isAPre = item.name.startsWith('pre');
      let isAPost = item.name.startsWith('post');
      return hasAPre || hasAPost || isAPre || isAPost;
    });

    const [prefixed, single] = partition(withoutHooks, item => {
      if (favorites.includes(item.name)) {
        return false;
      }

      const includesSemi = item.name.includes(':');

      //if there is "deploy", group it with "deploy:db", "deploy:all", etc
      const relatesToOtherScriptsThatHaveSemi = withoutHooks.some(
        s => item.name !== s.name && item.name === s.name.split(':')[0]
      );

      if (includesSemi || relatesToOtherScriptsThatHaveSemi) {
        const splitted = item.name.split(':');
        return Object.entries(packageJson.scripts).find(
          ([a]) => a.includes(`${splitted[0]}:`) === true && a !== item.name
        );
      }

      //always return start in a separate group
      if (item.name === 'start') {
        return 'start';
      }

      return false;
    });

    const groupedPrefixed = groupBy(prefixed, item => {
      const splitted = item.name.split(':');
      return splitted[0];
    });

    const groupedWithHooks = groupBy(withHooks, item => {
      const separator = item.name.startsWith('post') ? 'post' : 'pre';
      if (item.name.startsWith('post') || item.name.startsWith('pre')) {
        return item.name.split(separator)[1];
      }
      return item.name;
    });

    const favoritesGroup = withoutHooks.filter(s => favorites.includes(s.name));

    const grouped = {
      ...(favoritesGroup.length > 0 && { Favorites: favoritesGroup }),
      ...groupedPrefixed,
      ...groupedWithHooks
    };

    console.log('grouped', grouped);

    const { groupScriptsByPrefix } = settings;

    const showGrouped = groupScriptsByPrefix === true && Object.keys(grouped).length >= 1;

    let noScripts = list.length === 0;
    return (
      <Provider scripts={scriptsStore}>
        <S.ScriptsManager>
          <A.Horizontal spaceAll={10} centerV>
            <S.Title>Scripts</S.Title>
            <A.Horizontal spaceAll={15} centerV>
              <IconWithTip
                tip="Add a script"
                onClick={this.props.store.currentProject.addingScript.setTrue}
                icon={faPlus}
              />
              <IconWithTip tip="Scripts settings" onClick={this.showSettings.setTrue} icon={faCog} />
            </A.Horizontal>
          </A.Horizontal>

          <A.Space size={3} />

          {noScripts && (
            <S.AddScript spaceAll={10} onClick={this.props.store.currentProject.addingScript.setTrue}>
              <A.ActionIcon icon={faPlus} />
              <div>Add script</div>
            </S.AddScript>
          )}

          {!showGrouped && <ScriptsList list={list} />}

          {showGrouped && (
            <S.Groups>
              {map(grouped, (group, key) => <ScriptsGroup key={key} name={key} group={group} />)}
              <ScriptsGroup key="other" name="Other" group={single} />
            </S.Groups>
          )}

          {project.editingScript && (
            <Dialog onClose={project.clearEditingScript}>
              <ScriptEditingDialog
                onCancel={project.clearEditingScript}
                onSave={project.updateScript}
                scriptName={project.editingScript}
                fullCommand={get(project, `packageJson.scripts.${project.editingScript}`)}
                description={get(project, `packageJson[scripts-info].${project.editingScript}`)}
                name={project.editingScript}
              />
            </Dialog>
          )}

          {project.addingScript.value && (
            <Dialog onClose={project.addingScript.setFalse}>
              <ScriptEditingDialog onCancel={project.addingScript.setFalse} onSave={project.updateScript} />
            </Dialog>
          )}

          {this.showSettings.value && (
            <Dialog dockRight noBackdrop>
              <A.Padding>
                <A.Vertical>
                  <A.Horizontal centerV spaceBetween>
                    <h3> Scripts settings </h3>
                    <A.ActionIcon onClick={() => this.showSettings.setValue(false)} icon={faTimes} />
                  </A.Horizontal>

                  <FormControlLabel
                    label="Group by prefix"
                    classes={LabelClasses}
                    control={<Switch {...bindSettingToSwitch(settings, 'groupScriptsByPrefix')} />}
                  />

                  <FormControlLabel
                    label="Show commands"
                    classes={LabelClasses}
                    control={<Switch {...bindSettingToSwitch(settings, 'showScriptsCommands')} />}
                  />

                  <FormControlLabel
                    label="Label commands with colors and icons"
                    classes={LabelClasses}
                    control={<Switch {...bindSettingToSwitch(settings, 'labelScriptsCommands')} />}
                  />

                  <FormControlLabel
                    label="Show descriptions"
                    classes={LabelClasses}
                    control={<Switch {...bindSettingToSwitch(settings, 'showScriptsDescriptions')} />}
                  />

                  <FormControlLabel
                    label="Vertical layout"
                    classes={LabelClasses}
                    control={<Switch {...bindSettingToSwitch(settings, 'verticalScriptsLayout')} />}
                  />
                </A.Vertical>
              </A.Padding>
            </Dialog>
          )}
        </S.ScriptsManager>
      </Provider>
    );
  }
}

export default ScriptsManager;
