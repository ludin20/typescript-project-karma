import React from 'react';
import styled from 'styled-components';

import tip from '../../assets/tip-big.png';

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
      font-size: 14px;
      font-weight: 900;
    }
  }

  img {
    width: 30px;
  }

  img:nth-child(2) {
    margin-left: 20px;
    height: 30px;
    border-radius: 50%;
  }

  p {
    margin-left: 15px;

    strong {
      color: #fff;
      font-size: 14px;
      margin-right: 5px;
    }

    span {
      color: ${props => props.theme.gray};
      font-size: 14px;
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
      <img src={tip} alt="tip" />

      <img src={author.imageUrl} alt={author.name} />
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
