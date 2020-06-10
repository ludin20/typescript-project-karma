import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import karmas from '../assets/karmas.png';
import Space from '../common/Space';

const Container = styled.div`
  background: ${props => props.theme.dark};
  width: 100%;
  padding: 25px 25px;
  border-radius: 25px;
  font-family: sans-serif;

  > header {
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;

    > strong {
      color: #fff;
      font-size: 32px;
      font-weight: 700;
    }
  }

  > div {
    display: inline-block;

    > p {
      color: #fff;
      font-size: 24px;
      font-weight: 500;
    }
  }

  @media (max-width: 550px) {
    > strong {
      font-size: 24px;
    }
  }
`;

const Content = styled.div`
  display: block !important;
  margin-top: 20px;

  > div {
    width: 50%;
    display: inline-block;

    @media (max-width: 700px) {
      width: 100%;
    }

    > p {
      color: #fff;
      font-size: 24px;
      font-weight: 500;
    }
  }
`

const AmountEarned = styled.div`
  display: block;

  > p {
    color: #fff;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  
  button:last-child {
    width: 190px;
    background: linear-gradient(270deg, #26cc8b 0%, #2adce8 100%) 0% 0%;
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 900;
    box-shadow: 0px 3px 25px #26cc8b80;
    border-radius: 90px;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    img {
      width: 26px;
      margin-right: 10px;
    }
  }
`

export interface StatsProps {
}

const Stats: React.FC<StatsProps> = ({  }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <header>
        <strong>Stats</strong>
      </header>
      <Content>
        <div>
          <p>Referral Level</p>
          <p>Level 1</p>
        </div>
        <div>
          <p>Total Invites</p>
          <p>3 Freinds</p>
        </div>
      </Content>
      <AmountEarned>
        <p>Amount Earned</p>
        <button>
          <img src={karmas} alt="karmas" />
          600 KARMA
        </button>
      </AmountEarned>
    </Container>
  );
};

export default Stats;
