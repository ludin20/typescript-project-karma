import React from 'react';
import styled from 'styled-components';

import SearchBar from './SearchBar';
import Actions from './Actions';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;
  top: 0;
`;

const Header: React.FC = () => {
  return (
    <Container>
      <SearchBar />
      <Actions />
    </Container>
  );
};

export default Header;
