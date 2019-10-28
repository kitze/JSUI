import emotion from '@emotion/styled';
import { size } from 'styles/mixins';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import flex from 'styles/flex';

export const Processes = emotion.div(
  {
    width: '100%',
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
    ...flex.vertical,
    backgroundColor: '#1a1a1a'
  },
  ({ height, fullScreen }) => ({
    ...(fullScreen
      ? {
          height: '100vh'
        }
      : {
          height
        })
  })
);

export const Icon = emotion(FontAwesomeIcon)({
  ...size(20),
  color: 'white'
});
