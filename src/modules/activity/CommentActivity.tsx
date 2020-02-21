import React from 'react';
import styled from 'styled-components';

import commented from '../../assets/commented.svg';

const Container = styled.div`
  width: 100%;
  margin-top: 40px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  img {
    width: 30px;
  }

  p {
    color: ${props => props.theme.gray};
    font-size: 14px;
    line-height: 22px;
    font-weight: 900;
  }

  img {
    height: 30px;

    &:first-child {
      margin-right: 10px;
    }
  }

  span {
    color: ${props => props.theme.gray};
    font-size: 14px;
    font-weight: 900;
  }

  section {
    display: flex;

    img:nth-child(1) {
      border-radius: 50%;
    }

    strong {
      color: #fff;
      font-size: 14px;
    }
  }
`;

interface Props {
  item: any;
}

const CommentActivity: React.FC<Props> = ({ item: data }) => {
  const { author } = data;

  return (
    <Container>
      <img src={commented} alt="comment" />

      <section>
        <img src={author.imageUrl} alt={author.name} />
        <p>
          <strong>{`${author.name}  `}</strong>
          commented on your post: {data.content}
        </p>
      </section>

      <span>{data.date}</span>
    </Container>
  );
};

export default CommentActivity;
