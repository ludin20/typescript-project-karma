import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/logo.png';
import karmaBg from '../../assets/karma-bg.png';

import JoinBox from './JoinBox';

const Bg = styled.img`
  height: 1000px;

  position: absolute;
  top: 0;
  left: 0;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;

  position: absolute;
  top: 30px;

  strong {
    color: #fff;
    font-size: 30px;
    margin-left: 10px;
  }

  > img {
    width: 50px;
    height: 50px;
  }
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

const Sign: React.FC = () => {
  return (
    <Container>
      <Bg src={karmaBg} alt="Karma" />
      <Logo>
        <img src={logo} alt="Karma" />
        <strong>KARMA</strong>
      </Logo>
      <JoinBox />
    </Container>
  );
};

export default Sign;
