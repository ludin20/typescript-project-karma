import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import cookie from 'js-cookie';

import { KARMA_AUTHOR } from '../../common/config';

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
    margin: 20px 0;
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

    img {
      margin-right: 5px;
    }
  }

  @media (max-width: 550px) {
    strong {
      font-size: 55px;
    }

    span {
      font-size: 16px;
    }

    button {
      font-size: 14px;
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
  justify-content: space-between;

  @media (max-width: 550px) {
    button {
      padding: 10px !important;
      img {
        height: 20px !important;
      }
    }
  }

  button {
    background: rgba(255, 255, 255, 0.2);
    padding: 10px;
    //border-radius: 50%;

    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    img {
      height: 25px;
      margin-right: 0 !important;
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

export interface BalanceProps {
  currentPower: number;
  totalAmount: string;
  onRefresh: any;
  userloading: boolean;
}

const Balance: React.FC<BalanceProps> = ({ currentPower, totalAmount, onRefresh, userloading }) => {
  const [loading, setLoading] = useState(false);
  const author = cookie.get(KARMA_AUTHOR);

  useEffect(() => {
    setLoading(userloading);
  }, [userloading]);

  const handleRefresh = () => {
    setLoading(true);
    onRefresh();
  };

  return (
    <Container>
      <Refresh loading={loading ? 1 : 0}>
        <button>{author}</button>
        <button onClick={handleRefresh} type="button">
          <img src={refresh} alt="refresh" />
        </button>
      </Refresh>

      <strong>$ {totalAmount}</strong>
      <span>TOTAL BALANCE</span>
      <button>
        <img src={powerIcon} alt="power" />
        {currentPower} KARMA Power
      </button>
    </Container>
  );
};

const mapStateToProps = state => ({
  userloading: state.user.loading,
});

export default connect(mapStateToProps)(Balance);
