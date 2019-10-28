import emotion from '@emotion/styled';
import { css } from 'emotion';

import { Switch as $Switch } from '@material-ui/core';
import withProps from 'recompose/withProps';
import flex from 'styles/flex';

export const Switch = withProps({
  classes: {
    root: css({
      position: 'relative',
      left: -10,
      marginRight: -10
    })
  }
})($Switch);

export const Settings = emotion.div({
  ...flex.vertical,
  flex: 1,
  color: 'rgba(0,0,0,0.5)'
});

export const TabsWrap = emotion.div({
  backgroundColor: '#45527b',
  width: '100%',
  color: 'white'
});

export const Content = emotion.div({
  ...flex.vertical,
  flex: 1,
  padding: 15,
  overflowY: 'auto'
});

export const Title = emotion.div({
  fontWeight: 'bold',
  marginBottom: 15,
  color: 'white',
  fontSize: 20
});

export const Option = {
  Title: emotion.div({
    marginBottom: 5,
    color: 'white',
    fontSize: 15
  }),
  Description: emotion.div({
    color: 'white',
    fontSize: 12
  })
};
