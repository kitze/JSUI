import React from 'react';
import 'global-css';
import { wrappers } from 'storybook-helpers';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';

//storybook
import { storiesOf } from '@storybook/react';

//components
import ProjectCard from './index';
import { PROJECT_TAGS } from 'config/enums';
import { variants } from 'storybook-helpers/variants';

import { Variants } from 'storybook-helpers/variants';

const stories = storiesOf('Project card', module);

stories
  .addDecorator(wrappers.padding)
  .addDecorator(withKnobs)
  .addDecorator(wrappers.store({
    settings: {}
  }))
  .addDecorator(wrappers.backgrounds);

const getProject = ({
  name = 'Awesome project',
  ready = true,
  origin = true,
  type = PROJECT_TAGS.REACT_NATIVE
} = {}) => ({
  name: text('Name', name),
  ready: boolean('Ready', ready),
  origin: boolean('Is on git', origin),
  type: select('Type', PROJECT_TAGS, type)
});

stories.add('default project card', () => <ProjectCard project={getProject()} />);

const cardVariants = {
  origin: variants.boolean(['on git', 'not on git']),
  ready: variants.boolean(['ready', 'not ready']),
  name: variants.string(['Sm', 'Normal name', 'Super awesome crazy name'])
};

stories.add('All card variations', () => {
  return (
    <Variants columns={3} variants={cardVariants}>
      {({ props, name }) => <ProjectCard project={{ name, ...props }} />}
    </Variants>
  );
});
