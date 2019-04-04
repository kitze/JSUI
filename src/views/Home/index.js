import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';

//icons
import {
  faObjectGroup,
  faGlobe,
  faFolderOpen,
  faBoxOpen,
  faPlus,
  faCogs
} from '@fortawesome/fontawesome-free-solid';

import { faGithub } from '@fortawesome/fontawesome-free-brands';

//styles
import * as S from './styles';
import * as A from 'styles/shared-components';
import flex from 'styles/flex';

//components
import Group from 'components/Group';
import Header from 'components/Header';
import IconWithTip from 'components/IconWithTip';

import keydown from 'react-keydown';
import FilterProjectsSidebar from 'components/FilterProjectsSidebar';

@inject('store')
@observer
class Home extends Component {
  @keydown(['cmd+o'])
  openFolder() {
    const { store } = this.props;
    store.openFolder();
  }

  @keydown(['cmd+g'])
  createGroup() {
    const { store } = this.props;
    store.createGroup();
  }

  render() {
    const { store } = this.props;
    const { showWelcomeScreen, settings, groupsWithProjects, collapsed } = store;
    const { horizontalLayout } = settings;

    return (
      <S.Home>
        <Header>
          {!showWelcomeScreen && (
            <Fragment>
              <IconWithTip onClick={() => store.openFolder()} icon={faPlus} tip="Import local project" />
              <IconWithTip
                onClick={store.openCodeWorkspace}
                icon={faBoxOpen}
                tip="Import a VS Code workspace"
              />
              <IconWithTip
                onClick={store.bulkImport}
                icon={faFolderOpen}
                tip="Bulk import projects from folder"
              />
              <A.VerticalSeparator />
              <IconWithTip
                onClick={store.importingWebUrl.setTrue}
                icon={faGlobe}
                tip="Import a web project"
              />
              <IconWithTip
                onClick={store.importingGithubUrl.setTrue}
                icon={faGithub}
                tip="Import a GitHub project"
              />
              <A.VerticalSeparator />
              <IconWithTip onClick={store.createGroup} icon={faObjectGroup} tip="Create a group" />
              <IconWithTip onClick={store.generateDialogOpen.setTrue} icon={faCogs} tip="Generate an app" />
            </Fragment>
          )}
        </Header>

        {showWelcomeScreen && (
          <S.Empty>
            <S.Title>You don't have any projects. Add your first one?</S.Title>
            <A.Horizontal spaceAll={15}>
              <A.Button onClick={store.openFolder}> Import a project </A.Button>
              <A.Button onClick={store.generateDialogOpen.setTrue}> Generate a project </A.Button>
            </A.Horizontal>
          </S.Empty>
        )}

        {!showWelcomeScreen && (
          <A.Horizontal>
            {settings.showHomeSidebar && <FilterProjectsSidebar />}
            <A.Mid>
              <S.GroupList
                contentProps={{
                  style: {
                    ...(horizontalLayout && {
                      ...flex.horizontal,
                      flex: 1,
                      alignItems: 'stretch'
                    })
                  }
                }}
                horizontal={horizontalLayout}
              >
                {groupsWithProjects.map(group => (
                  <Group
                    horizontal={horizontalLayout}
                    hideIfEmpty={store.projectFilters.searchText.hasValue}
                    onClick={() => collapsed && store.pickGroupForProject(group)}
                    collapsed={collapsed}
                    group={group}
                    key={group.id}
                  />
                ))}
              </S.GroupList>
            </A.Mid>
          </A.Horizontal>
        )}
      </S.Home>
    );
  }
}

export default Home;
