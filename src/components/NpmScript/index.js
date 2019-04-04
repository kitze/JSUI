import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { faTrash, faPenSquare, faStar } from '@fortawesome/fontawesome-free-solid';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';

//components
import ScriptDefinition from 'components/ScriptDefinition';

@inject('scripts')
@inject('store')
@observer
class NpmScript extends Component {
  hover = () => {
    const {
      scripts,
      script: { name }
    } = this.props;

    scripts.highlightedCommand.setValue(name);
  };

  deleteScript = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    const { store } = this.props;
    store.currentProject.deleteScript(name);
  };

  toggleFavorite = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    const { store } = this.props;
    store.currentProject.toggleFavorite(name);
  };

  editScript = (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    const { store } = this.props;
    store.currentProject.editScript(name);
  };

  render() {
    const { scripts, script, store } = this.props;
    const { name, description, definition } = script;
    const { settings, currentProject } = store;
    const {
      showScriptsCommands,
      showScriptsDescriptions,
      labelScriptsCommands,
      verticalScriptsLayout
    } = settings;

    const onlyName = !showScriptsCommands && !showScriptsDescriptions;
    const isFavorite = store.currentProject.checkScriptFavorite(name);

    return (
      <S.NpmScript
        horizontal={verticalScriptsLayout}
        onClick={() => currentProject.runScript(name)}
        onlyName={onlyName}
        onMouseEnter={this.hover}
        onMouseLeave={scripts.clear}
        key={name}
      >
        <A.Horizontal>
          <S.Name> {name} </S.Name>
          <S.Icons spaceAll={3}>
            {/*<A.A*/}
            {/*onClick={this.expanded.toggle}*/}
            {/*active={this.expanded.value}*/}
            {/*onIcon={faCaretUp}*/}
            {/*offIcon={faCaretDown}*/}
            {/*/>*/}
            <S.ActionIcon onClick={e => this.deleteScript(e, name)} icon={faTrash} />
            <S.ActionIcon onClick={e => this.editScript(e, name)} icon={faPenSquare} />
            <S.ActionIcon favorite={isFavorite} onClick={e => this.toggleFavorite(e, name)} icon={faStar} />
          </S.Icons>
        </A.Horizontal>

        {description &&
          showScriptsDescriptions && (
            <Fragment>
              <A.Space size={2} />
              <S.Description>{description}</S.Description>
            </Fragment>
          )}

        {showScriptsCommands && (
          <Fragment>
            <A.Space size={2} />
            <ScriptDefinition useLabels={labelScriptsCommands} definition={definition} />
          </Fragment>
        )}
      </S.NpmScript>
    );
  }
}

export default NpmScript;
