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

  header {
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;

    > strong {
      color: #fff;
      font-size: 32px;
      font-weight: 900;
    }

    > h3 {
      color: #fff;
    }
  }

  div {
    display: inline-block;

    > p {
      color: #fff;
      font-size: 24px;
      font-weight: 900;
    }
  }

  @media (max-width: 550px) {
    > strong {
      font-size: 24px;
    }
  }
`;

const Content = styled.div`
`
const Item = styled.div`
  display: block !important;

  > strong:nth-child(2) {
    font-size: 24px;
    color: #fff;
  }

  > strong:nth-child(3) {
    font-size: 24px;
    color: #29DB95;
  }
`

export interface StatsProps {
}

const Stats: React.FC<StatsProps> = ({  }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <header>
        <strong>Refered Users</strong>
        <h3>Earnings</h3>
      </header>
      <Content>
        {referandearn.map(item =>
          <Item>
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
