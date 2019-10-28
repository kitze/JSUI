import emotion from '@emotion/styled';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import flex from 'styles/flex';

export const
  Dialogs = emotion.div({});

export const Editor = emotion(CodeMirror)({
  ...flex.vertical,
  flex: 1,
  '& .CodeMirror': {
    flex: 1,
    fontSize: 15
  }
});
