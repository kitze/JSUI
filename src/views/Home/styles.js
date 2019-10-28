import flex from 'styles/flex';
import emotion from '@emotion/styled';
import Scroll from 'react-scrollbars-custom';

export const Home = emotion.div({
  ...flex.vertical,
  flex: 1
});

export const Title = emotion.div({
  marginBottom: 20,
  color: 'white'
});

export const BabelWebview = emotion.div({
  width: '100%',
  height: '100%'
});

export const Empty = emotion.div({
  ...flex.vertical,
  ...flex.centerVertical,
  flex: 1
});

export const GroupList = emotion(Scroll)({}, ({ horizontal }) => ({
  flex: 1,
  ...(horizontal && {
    ...flex.horizontal,
    flex: 1,
    alignItems: 'stretch'
  })
}));
