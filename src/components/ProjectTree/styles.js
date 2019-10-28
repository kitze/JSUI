import styled from '@emotion/styled';
import flex from 'styles/flex';

export const ProjectTree = styled.div({
  ...flex.vertical,
  flex: 1,
  minWidth: 150,
  maxWidth: 300,
  overflow: 'auto',
  // backgroundColor: '#263238',
  color: 'white',
  padding: '10px 15px 10px 0px'
});
