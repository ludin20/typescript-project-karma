import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import karmas from '../assets/karmas.png';
import Space from '../common/Space';

const Container = styled.div`
  background: ${props => props.theme.dark};
  width: 500px;
  height: 350px;
  padding: 25px 25px;
  border-radius: 25px;
  font-family: Montserrat, sans-serif;

  @media (max-width: 1560px) { 
    width: 100%;
  }

  > header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    > strong {
      color: #fcfefe;
      font-size: 30px;
      font-weight: 700;
    }
  }

  > div {
    display: inline-block;

    > p {
      color: #fcfefe;
      margin-top: 8px;
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 14px;
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

  > div {
    width: 50%;
    display: inline-block;

    @media (max-width: 700px) {
      > p {
        font-size: 20px !important;
      }
      > span {
        font-size: 18px !important;
      }
    }

    > p {
      color: #fcfefe;
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 40px;
    }

    > span {
      color: #fcfefe;
      font-size: 22px;
      font-weight: 600;
      margin-bottom: 20px;
      padding: 15px 30px 15px 30px;
      border: 2px solid white;
      border-radius: 90px;
    }
  }
`

const AmountEarned = styled.div`
  display: block;
  margin-top: 40px;
  position: relative; 

  > p {
    color: #fcfefe;
    margin-top: 6px;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 18px;
  }

  img {
    position: absolute;
    left: 20px;
    top: 64px;
    width: 30px;
    padding: 5px;
    margin-right: 10px;
    background: black;
    border-radius: 50%;
    border: 2px solid #3ad3c7;
    line-height: 60px;
    margin-bottom: 2px;
    box-shadow: 1px 1px 1px #585757;
  }
  
  button:last-child {
    width: 220px;
    background: linear-gradient(270deg,#51c799 0%,#2adce8 100%) 0% 0%;
    color: #101010;
    padding: 18px 20px;
    padding-left: 55px;
    height: 60px;
    line-height: 20px;
    font-size: 22px;
    font-weight: 700;
    box-shadow: 0px 3px 25px #26cc8b80;
    border-radius: 90px;

    display: flex;
    align-items: flex-end;
    justify-content: center;    
  }
`

export interface StatsProps {
}

const Stats: React.FC<StatsProps> = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <header>
        <strong>Stats</strong>
      </header>
      <Content>
        <div>
          <p>Referral Level</p>
          <span>Level 1</span>
        </div>
        <div>
          <p>Total Invites</p>
          <span>3 Friends</span>
        </div>
      </Content>
      <AmountEarned>
        <p>Amount Earned</p>
        <img src={karmas} alt="karmas" />
        <button>          
          600 KARMA
        </button>
      </AmountEarned>
    </Container>
  );
};

export default Stats;
