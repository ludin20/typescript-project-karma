import React from 'react';

import styled from 'styled-components';

import Aside from './Aside';
import Sign from './Sign';

const Container = styled.div`
  height: 100%;
  background: ${props => props.theme.blue};

  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: row;
  }
`;

const Auth: React.FC = props => {
  return (
    <Container {...props}>
      <div>
        <Aside />
        <Sign />
      </div>
    </Container>
  );
};

export default Auth;
