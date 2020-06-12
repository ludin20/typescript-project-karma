import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Space from '../common/Space';

const Container = styled.div`
  background: ${props => props.theme.dark};
  width: 500px;
  height: 350px;
  padding: 25px 25px;
  border-radius: 25px;
  letter-spacing: 1px;
  font-family: Montserrat, sans-serif;

  @media (max-width: 1560px) { 
    width: 100%;
  }

  header {
    margin-bottom: 20px;

    display: flex;
    justify-content: space-between;

    > strong {
      color: #fcfefe;
      font-size: 30px;
      font-weight: 700;
    }
  }

  > p {
    color: #fcfefe;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  > p.unique_link {
    color: #fcfefe;
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  @media (max-width: 550px) {
    > strong {
      font-size: 24px;
    }
    
    > p {
      font-size: 18px;
    }
  }
`;

const Description = styled.p`
  color: #ece9e9;
  font-size: 18px;
  letter-spacing: 0.8px;
  font-size: 18px;
  line-height: 28px;
`

const UniqueLink = styled.div`
  position: relative;
  height: 60px;
  border: 1px solid #4ec89f;
  border-width: 2px;
  border-radius: 90px;
  padding-left: 20px;
  padding-top: 15px;

  @media (max-width: 800px) {
    padding-top: 10px;
    height: 40px;

    button:last-child {
      height: 40px !important;
      font-size: 16px !important;
      line-height: 20px !important;
      width: 80px !important;
    }   

    span {
      font-size: 14px !important;
    }
  }

  button:last-child {
    position: absolute;
    right: 0;
    top: -2px;
    height: 60px;
    line-height: 40px;
    width: 120px;
    background: linear-gradient(270deg,#51c799 0%,#2adce8 100%) 0% 0%;
    color: #101010;
    padding: 10px 20px;
    font-size: 20px;
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

  span {
    color: white;
    font-size: 20px;
  }
`

export interface StatsProps {
}

const InviteNow: React.FC<StatsProps> = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <header>
        <strong>Invite Now</strong>
      </header>
      <Description>Use your unique referral link to invite friends to KARMA. This can be shared by phone, email or on other social platforms.</Description>
      <Space height={30} />
      <p class="unique_link">Your unique link</p>
      <UniqueLink>
        <span>www.karmaapp.io/r/13829</span><button>Copy</button>
      </UniqueLink>
    </Container>
  );
};

export default InviteNow;
