import React from 'react';

import styled from 'styled-components';

import { Seo, AuthAside, Sign } from '../ui';

const Container = styled.div`
  height: 100%;
  background: ${props => props.theme.blue};

  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;

    > div {
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Auth: React.FC = props => {
  return (
    <Container {...props}>
      <Seo />
      <div>
        <AuthAside />
        <Sign />
      </div>
    </Container>
  );
};

export default Auth;
