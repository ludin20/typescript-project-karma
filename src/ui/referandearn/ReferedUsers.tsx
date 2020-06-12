import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import karmas from '../assets/karmas.png';
import { referandearn } from '../../mock';
import Avatar from '../common/Avatar';

const Container = styled.div`
  background: ${props => props.theme.dark};
  width: 100%;
  padding: 25px 25px;
  border-radius: 25px;
  font-family: Montserrat, sans-serif;
  
  header {
    margin-bottom: 30px;    
    padding-right: 5px;
    display: flex;
    justify-content: space-between;

    @media (max-width: 550px) {
      > strong {
        font-size: 20px !important;
      }

      > span { 
        font-size: 18px !important;
      }
    }

    > strong {
      color: #fff;
      font-size: 32px;
      font-weight: 900;
      line-height: 40px;
    }

    > span {
      color: #fff;
      font-size: 24px;
      line-height: 40px;
    }
  }

  div {
    display: inline-block;
    width: 100%;
    > p {
      color: #fff;
      font-size: 24px;
      font-weight: 900;
    }
  }

  
`;

const Content = styled.div`
  @media (max-width: 550px) {
    padding-bottom: 50px;
  }
`
const Item = styled.div`
  display: block !important;
  position: relative;
  margin-bottom: 20px;

  @media (max-width: 550px) {
    > strong:nth-child(2) {
      font-size: 14px !important;
    }

    > strong:nth-child(3) {
      font-size: 14px !important;
    }
  }

  > strong:nth-child(2) {
    position: absolute;
    top:10px;
    left: 70px;
    font-size: 20px;
    color: #fff;
    font-weight: 400;
  }

  > strong:nth-child(3) {
    position: absolute;
    top:10px;
    right: 0px;
    font-size: 22px;
    color: #29DB95;
    font-weight: 600;
  }
`

export interface StatsProps {
}

const Stats: React.FC<StatsProps> = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <header>
        <strong>Refered Users</strong>
        <span>Earnings</span>
      </header>
      <Content>
        {referandearn.map((item, index) =>
          <Item key={String(index)}>
            <Avatar src={item.avatar} alt={name} size="small" />
            <strong>{item.name}</strong>
            <strong>{item.karma} KARMA</strong>
          </Item>
        )}
      </Content>
    </Container>
  );
};

export default Stats;
