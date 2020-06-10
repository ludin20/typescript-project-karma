import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.theme.dark};
  width: 100%;
  padding: 25px 25px;
  border-radius: 25px;

  header {
    margin-bottom: 24px;

    display: flex;
    justify-content: space-between;

    > strong {
      color: #fff;
      font-size: 32px;
      font-weight: 900;
    }
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

const Description = styled.div`
  color: #fff;
  font-size: 24px;
  margin-bottom: 40px
`

const UniqueLink = styled.div`
  > p {
    color: #fff;
    font-size: 24px;
    font-weight: 900;
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

const InviteNow: React.FC<StatsProps> = ({  }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <header>
        <strong>Invite Now</strong>
      </header>
      <Description>Use your unique referral link to invite friends to KARMA. This can be shared by phone, email or on other social platforms.</Description>
      <UniqueLink>
        <p>Your unique link</p>
        <button>Copy</button>
      </UniqueLink>
    </Container>
  );
};

export default InviteNow;
