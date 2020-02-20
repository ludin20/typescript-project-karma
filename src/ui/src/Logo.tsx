import React from 'react';
import styled, { css } from 'styled-components';

import logo from '../assets/logo.png';

const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;

  strong {
    color: #fff;
    font-size: 30px;
    font-family: Montserrat, sans-serif;
    margin-left: 10px;
  }

  > img {
    width: 50px;
    height: 50px;
  }

  ${props =>
    props.size === 'small' &&
    css`
      margin: 0 auto;
      strong {
        font-size: 25px;
        margin-left: 10px;
      }

      > img {
        width: 45px;
        height: 45px;
      }
    `}
`;

interface Props {
  size?: 'small' | 'big';
}

const Logo: React.FC<Props> = props => {
  return (
    <Container {...props}>
      <img src={logo} alt="Karma" />
      <strong>KARMA</strong>
    </Container>
  );
};

export default Logo;
