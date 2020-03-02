import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

import powerIcon from '../assets/power-count.svg';
import refresh from '../assets/refresh.svg';

const Container = styled.div`
  padding: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    color: #fff;
    font-size: 80px;
    font-weight: 800;
  }

  span {
    color: #fff;
    font-size: 24px;
  }

  button {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    margin: 10px 0;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 900;
    border-radius: 50px;

    display: flex;
    align-items: center;

    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Refresh = styled.div<{ loading: number }>`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  button {
    background: rgba(255, 255, 255, 0.2);
    padding: 20px;
    border-radius: 50%;

    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    img {
      height: 25px;
    }
  }

  ${props =>
    props.loading &&
    css`
      img {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

const Balance: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Container>
      <Refresh loading={loading ? 1 : 0}>
        <button onClick={handleRefresh} type="button">
          <img src={refresh} alt="refresh" />
        </button>
      </Refresh>

      <strong>$ 3,906.15</strong>
      <span>TOTAL BALANCE</span>
      <button>
        <img src={powerIcon} alt="power" />
        1.3M KARMA Power
      </button>
    </Container>
  );
};

export default Balance;
