import React from 'react';
import styled from '@emotion/styled';
import { groupBy, orderBy } from 'lodash';

//components
import Folder from '../Folder';
import File from '../File';

export const Contents = styled.div({
  marginLeft: 10,
  fontSize: 15
});

const sortEntries = entries => {
  return orderBy(entries, [e => e && e.name[0] === '.', e => e && e.name.toLowerCase()], ['desc', 'asc']);
};

const ContentsComponent = ({ contents, onSelect }) => {
  const result = groupBy(contents, entry => !!entry.contents);
  const { true: folders = [], false: files = [] } = result;

  return (
    <Contents>
      {sortEntries(folders).map(entry => (
        <Folder onSelect={onSelect} key={entry.name} folder={entry} />
      ))}

      {sortEntries(files).map(entry => (
        <File key={entry.name} onSelect={() => onSelect(entry.path)} file={entry} />
      ))}
    </Contents>
  );
};

export default ContentsComponent;
