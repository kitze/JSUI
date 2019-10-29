import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import emotion from '@emotion/styled';
import flex from 'styles/flex';
import * as A from 'styles/shared-components';

export const Mid = emotion(A.Mid)(({ withPadding }) => ({
  ...flex.vertical,
  ...(withPadding && {
    paddingBottom: 1000
  })
}));

export const Right = emotion.div({
  ...flex.vertical
});

export const InfoStrip = emotion(A.Horizontal)({
  padding: 15,
  // backgroundColor: '#465065',
  color: 'white',
  fontSize: 14
});

export const ProjectView = emotion.div({
  color: 'rgba(0,0,0,0.5)',
  ...flex.vertical,
  flex: 1
});

export const Icon = emotion(FontAwesomeIcon)({
  color: 'white'
});

export const Title = emotion.div({
  fontWeight: 'bold',
  color: 'white'
});

export const Section = {
  Title: emotion.div({
    color: 'white'
  }),
  Content: emotion.div({})
};
