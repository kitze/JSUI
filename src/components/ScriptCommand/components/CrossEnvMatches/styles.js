import emotion from '@emotion/styled';
import flex from 'styles/flex';

export const CrossEnvMatches = emotion.div({
  ...flex.horizontal,
  userSelect: 'none',
  cursor: 'pointer'
});

export const Match = emotion.div({
  ...flex.horizontal,
  backgroundColor: 'rgba(255, 236, 98, 0.85)',
  color: 'rgba(0, 0, 0, 0.62)',
  borderRadius: 4,
  marginRight: 5,
  padding: 5,
  fontSize: 12
});

export const Table = {
  Wrap: emotion.div({
    ...flex.horizontal,
    ...flex.centerHorizontalV,
    ...flex.spaceBetween,
    fontSize: 12
  }),
  Name: emotion.div({
    marginRight: 10,
    backgroundColor: 'rgba(255, 236, 98, 0.85)',
    borderRadius: 4,
    padding: 5,
    color: 'rgba(0, 0, 0, 0.62)',
  }),
  Value: emotion.div({})
};

export const Name = emotion.div({});

export const Value = emotion.div({});
