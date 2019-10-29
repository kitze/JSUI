import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import * as S from './styles';
import * as A from 'styles/shared-components';

import { bindSettingToSwitch } from 'utils/bind-utils';

const TabContainer = ({ children }) => <A.Vertical>{children}</A.Vertical>;

@inject('store')
@observer
class Settings extends Component {
  render() {
    const { store, onSave } = this.props;
    const { settings } = store;

    let spaceBetweenSections = 7;
    let spaceBetweenOptions = 3;

    return (
      <S.Settings>
        {/*<S.TabsWrap>
          <Tabs
            value={selectedTabSettings.value}
            onChange={(e, value) => selectedTabSettings.setValue(value)}
          >
            <Tab value={SETTINGS_TABS.HOME} label="Home" />
            <Tab value={SETTINGS_TABS.PROJECT_VIEW} label="Project view" />
            <Tab value={SETTINGS_TABS.OTHER} label="Other" />
          </Tabs>
        </S.TabsWrap>*/}

        <S.Content>
          <A.TopFlex styles={{ border: '1px solid red', overflowY: 'scroll' }}>
            <S.Title>Home</S.Title>
            <TabContainer>
              <A.Horizontal centerV>
                <S.Switch {...bindSettingToSwitch(settings, 'highlightProjectsWithoutRepo')} />
                <S.Option.Title>Highlight projects without a repo</S.Option.Title>
              </A.Horizontal>
              <A.Horizontal centerV>
                <S.Switch {...bindSettingToSwitch(settings, 'showHomeSidebar')} />
                <S.Option.Title>Show filters sidebar</S.Option.Title>
              </A.Horizontal>
              <A.Horizontal centerV>
                <S.Switch {...bindSettingToSwitch(settings, 'horizontalLayout')} />
                <S.Option.Title>Horizontal layout</S.Option.Title>
              </A.Horizontal>
            </TabContainer>

            <A.Space size={spaceBetweenSections} />

            <S.Title>Project view</S.Title>
            <TabContainer>
              <A.Horizontal centerV>
                <S.Switch {...bindSettingToSwitch(settings, 'indexFiles')} />
                <S.Option.Title>List project files</S.Option.Title>
              </A.Horizontal>
              <S.Option.Description>It might slow down with bigger projects</S.Option.Description>
              <A.Space size={spaceBetweenOptions} />
            </TabContainer>

            <A.Space size={spaceBetweenSections} />

            <S.Title>Other</S.Title>
            <TabContainer>
              <S.Option.Title>Default projects path</S.Option.Title>
              <A.TextInput
                onChange={e => settings.changePath(e.target.value)}
                value={settings.projectsPath}
                type="text"
              />

              <A.Space size={spaceBetweenOptions} />

              <S.Option.Title>Editor cli</S.Option.Title>
              <A.TextInput
                onChange={e => settings.changeEditor(e.target.value)}
                value={settings.editor}
                type="text"
              />

              <A.Space size={spaceBetweenOptions} />

              <A.Horizontal centerV>
                <S.Switch {...bindSettingToSwitch(settings, 'automaticallyReleasePorts')} />
                <S.Option.Title>Automatically release ports when they're blocked</S.Option.Title>
              </A.Horizontal>

              <A.Horizontal centerV>
                <S.Switch {...bindSettingToSwitch(settings, 'openProjectWhenRunning')} />
                <S.Option.Title>
                  Open the project view after running a project from the main dashboard
                </S.Option.Title>
              </A.Horizontal>
            </TabContainer>

            <A.Space size={spaceBetweenSections} />
          </A.TopFlex>

          <A.Space size={spaceBetweenSections} />

          <A.Horizontal justifyEnd>
            <A.Button disabled={!settings.valid} onClick={onSave}>
              Save
            </A.Button>
          </A.Horizontal>
        </S.Content>
      </S.Settings>
    );
  }
}

export default Settings;
