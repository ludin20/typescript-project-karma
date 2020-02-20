import React from 'react';
import styled from 'styled-components';

import Actions from './Actions';
import Balance from './Balance';

const Container = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  margin-top: 20px;
  border-radius: 25px;
`;

const WalletContainer: React.FC = () => {
  return (
    <Container>
      <Balance />

      <Actions />
    </Container>
  );
};

export default WalletContainer;
