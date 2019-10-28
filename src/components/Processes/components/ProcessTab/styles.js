import emotion from '@emotion/styled';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { getActionColors, fixedHeight, fixedSize, marginHorizontal } from 'styles/mixins';
import { PROCESS_STATUS } from 'config/enums';
import flex from 'styles/flex';

export const ProcessTab = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontal,
  ...flex.spaceBetween,
  width: '100%',
  overflow: 'hidden',
  flex: 1,
  padding: '5px 10px',
  userSelect: 'none'
});

export const CloseIcon = emotion(FontAwesomeIcon)({
  position: 'relative',
  top: 0.5,
  ...fixedHeight(8),
  color: 'white'
});

export const Title = emotion.div({
  ...marginHorizontal(5),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const Status = emotion.div(
  {
    ...fixedSize(10),
    borderRadius: '100%'
  },
  ({ status }) => ({
    ...(status === PROCESS_STATUS.RUNNING && {
      backgroundColor: '#85da85'
    }),
    ...(status === PROCESS_STATUS.ERROR && {
      backgroundColor: 'red'
    }),
    ...(status === PROCESS_STATUS.STOPPED && {
      backgroundColor: 'yellow'
    })
  })
);

export const CloseCircle = emotion.div(
  {
    borderRadius: '100%',
    cursor: 'pointer',
    transition: 'all 100ms linear',
    ...fixedSize(15),
    ...flex.horizontal,
    ...flex.centerHorizontal
  },
  getActionColors('#545353')
);
