import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Row: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Row;
