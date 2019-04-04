import React from 'react';
import 'global-css';

//storybook
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, array } from '@storybook/addon-knobs/react';
import { wrappers, data } from 'storybook-helpers';

//utils
import { mapArray } from 'utils';
import map from 'lodash/map';

//components
import ProjectView from './index';
import Header from 'components/Header';

//styles
import { Vertical } from 'styles/flex-components';

const stories = storiesOf('Project View', module);

stories
  .addDecorator(
    wrappers.provideStore(() => {
      const name = text('Name', 'My Project');
      const ready = boolean('Ready');
      const hasProcess = boolean('Has process');

      const dependencies = mapArray(
        array('dependencies', map(data.dependencies, (d, v) => v), ','),
        () => '1.0.0'
      );

      const devDependencies = mapArray(
        array('dependencies', map(data.devDependencies, (d, v) => v), ','),
        () => '2.0.3'
      );

      return {
        currentProject: {
          name: name,
          ready: ready,
          selectedProcess: {
            id: 2
          },
          processes: {
            hasRunning: hasProcess,
            list: [
              {
                id: 1,
                path: '/webdev/kitze/projects',
                output: 'doing one thing',
                running: true
              },
              {
                id: 2,
                path: '/webdev/kitze/projects',
                output: 'doing another thing',
                running: true
              }
            ]
          },
          packageJson: {
            scripts: {
              start: 'yarn start',
              build: 'yarn build'
            },
            dependencies: dependencies,
            devDependencies: devDependencies
          }
        }
      };
    })
  )
  .addDecorator(withKnobs)
  .addDecorator(wrappers.backgrounds);

stories.add('default', () => {
  return (
    <Vertical>
      <Header />
      <ProjectView />
    </Vertical>
  );
});
