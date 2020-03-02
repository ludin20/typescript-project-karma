import React from 'react';
import styled from 'styled-components';

import close from '../../assets/close-white.svg';

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: relative;

  strong {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    padding: 8px 15px;
    font-size: 16px;
    font-weight: 900;
    border-radius: 100px;
  }

  button {
    background: none;
    position: absolute;
    right: 0;

    img {
      width: 32px;
    }
  }
`;

interface Props {
  handleClose(): void;
  liquidBalance: string | number;
}

const Header: React.FC<Props> = ({ handleClose, liquidBalance }) => {
  return (
    <Container>
      <div />
      <strong>Liquid Balance: {liquidBalance}</strong>
      <button onClick={handleClose}>
        <img src={close} alt="close" />
      </button>
    </Container>
  );
};

export default Header;
