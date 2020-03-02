import React from 'react';
import styled from 'styled-components';

import tip from '../assets/tip-big.png';

import Avatar from '../common/Avatar';

import Icon from './Icon';

const Container = styled.div`
  width: 100%;
  margin-top: 40px;

  display: flex;
  align-items: center;

  section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      color: ${props => props.theme.gray};
      font-size: 16px;
      font-weight: 900;
    }
  }

  p {
    margin-left: 5px;

    strong {
      color: #fff;
      font-size: 16px;
      margin-right: 5px;
    }

    span {
      color: ${props => props.theme.gray};
      font-size: 16px;
      font-weight: 900;

      &:last-child {
        color: ${props => props.theme.green};
      }
    }
  }
`;

interface Props {
  item: any;
}

const TipActivity: React.FC<Props> = ({ item }) => {
  const { author } = item;

  return (
    <Container>
      <Icon src={tip} alt="tip" />

      <Avatar src={author.avatar} alt={author.name} size="small" />
      <section>
        <p>
          <strong>{`${author.name}  `}</strong>
          <span>tipped you:</span>
          <span>{`  ${item.content}`}</span>
        </p>

        <span>{item.date}</span>
      </section>
    </Container>
  );
};

export default TipActivity;
