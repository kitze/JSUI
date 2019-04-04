import emotion from 'react-emotion';
import { size } from 'styles/mixins';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import flex from 'styles/flex';

export const Processes = emotion.div(
  {
    boxShadow: '0px 0px 14px 2px rgb(26, 38, 62)',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    ...flex.vertical,
    backgroundColor: 'gray'
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
