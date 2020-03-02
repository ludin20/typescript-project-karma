import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import arrow from '../assets/arrow-left.svg';

const Container = styled.button`
  background: none;
  margin: 0 0 30px 5px;

  img {
    width: 26px;
  }
`;

const GoBackButton: React.FC = () => {
  const router = useRouter();
  return (
    <Container onClick={() => router.back()}>
      <img src={arrow} alt="go back" />
    </Container>
  );
};

export default GoBackButton;
