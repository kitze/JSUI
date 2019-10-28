import React from 'react';
import styled from '@emotion/styled';

//components
import Folder from '../Folder';
import File from '../File';

export const Contents = styled.div({
  marginLeft: 10,
  fontSize: 15
});

const ContentsComponent = ({ contents, onSelect }) => (
  <Contents>
    {contents.map(
      entry =>
        entry.contents ? (
          <Folder onSelect={onSelect} key={entry.name} folder={entry} />
        ) : (
          <File key={entry.name} onSelect={() => onSelect(entry.path)} file={entry} />
        )
    )}
  </Contents>
);

export default ContentsComponent;
