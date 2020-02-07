import React from 'react';
import styled from 'styled-components';

import { Logo } from '@karma/ui';

import karmaBg from '../../assets/karma-bg.png';

import JoinBox from './JoinBox';

const Bg = styled.img`
  height: 1000px;

  position: absolute;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  width: 50%;
  padding: 0 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  top: 20px;
  right: 40px;
`;

const Sign: React.FC = () => {
  return (
    <Container>
      <Bg src={karmaBg} alt="Karma" />
      <StyledLogo />
      <JoinBox />
    </Container>
  );
};

export default Sign;
