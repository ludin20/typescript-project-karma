import React from 'react';
import styled from 'styled-components';

import Logo from '../../common/Logo';
import Column from '../../common/Column';

import karmaBg from '../../assets/karma-bg.png';

const WhiteLogo = styled.img`
  height: 1000px;
  width: 700px;

  position: absolute;
  top: 0;
  left: 0;

  @media (max-width: 1200px) {
    width: 100%;
    height: auto;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 40px;
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 650px) {
    padding: 0;
  }
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  top: 20px;
  right: 40px;

  img {
    width: 80px;
    height: 80px;
  }

  strong {
    font-size: 40px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const Content = styled.div`
  width: 400px;
  background: ${props => props.theme.dark};
  padding: 50px 30px;
  box-shadow: 0px 3px 20px #0000004d;
  border-radius: 25px;

  position: relative;
  z-index: 200;

  @media (max-width: 650px) {
    height: 100%;
    width: 100%;
    border-radius: 0;
  }
`;

const Form: React.FC = ({ children }) => {
  return (
    <Container>
      <StyledLogo />
      <WhiteLogo src={karmaBg} alt="Karma" />
      <Column align="center" justify="center">
        <Content>{children}</Content>
      </Column>
    </Container>
  );
};

export default Form;
