import emotion from '@emotion/styled';
import flex from 'styles/flex';

export const FileEntry = emotion.div({
  ...flex.horizontal,
  ...flex.centerHorizontalV,
  ...flex.spaceBetween,
  flex: 1
});

export const Name = emotion.div({});

export const Path = emotion.div({});
