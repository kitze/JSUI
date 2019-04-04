import React from 'react';
import 'global-css';
import { wrappers } from 'storybook-helpers';
import { withKnobs, array, text, boolean } from '@storybook/addon-knobs/react';
import { times, random, sample } from 'lodash';
import faker from 'faker';

//storybook
import { storiesOf } from '@storybook/react';

//components
import Group from './index';
import { PROJECT_TAGS } from 'config/enums';

const stories = storiesOf('Group', module);

stories
  .addDecorator(wrappers.padding)
  .addDecorator(withKnobs)
  .addDecorator(
    wrappers.store({
      settings: {}
    })
  )
  .addDecorator(wrappers.backgrounds);

const getGroup = ({
  name = 'My group',
  projects = ['First', 'Second', 'Third'],
  collapsed = false
} = {}) => ({
  group: {
    name: text('Name', name),
    projects: array('Project list', projects, ',').map(name => ({
      name,
      type: PROJECT_TAGS.REACT_NATIVE,
      customTags: times(random(0, 7), t => faker.hacker.adjective()),
      startScriptName: sample([true, false])
    }))
  },
  collapsed: boolean('Collapsed', collapsed)
});

stories.add('default group', () => <Group {...getGroup()} />);
