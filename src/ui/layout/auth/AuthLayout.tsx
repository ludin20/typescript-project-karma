import React from 'react';
import styled from 'styled-components';

import Row from '../../common/Row';

import AppDescription from './AppDescription';
import Form from './Form';

const Container = styled.div`
  height: 100%;
  background: ${props => props.theme.blue};
  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;

const Wrapper = styled(Row)`
  @media (max-width: 1200px) {
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        <AppDescription />
        <Form>{children}</Form>
      </Wrapper>
    </Container>
  );
};

export default AuthLayout;
