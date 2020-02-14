import React from 'react';
import styled from 'styled-components';

import { Actions } from '@karma/ui';

import commented from '../../assets/commented.svg';

const Container = styled.div`
  width: 95%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  img {
    width: 30px;
  }

  p {
    color: ${props => props.theme.gray};
    font-size: 14px;
    line-height: 22px;
    font-weight: 900;
    margin: 5px 0 0 95px;
  }

  header {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      border-radius: 50%;

      &:first-child {
        margin-right: 20px;
      }
    }

    strong {
      margin: 0 5px 0 15px;
      color: #fff;
      font-size: 14px;
    }

    span {
      color: ${props => props.theme.gray};
      font-size: 14px;
      font-weight: 900;
    }
  }
`;

const CommentActions = styled(Actions)`
  margin: 20px 0 0 95px;
  width: 80%;

  button {
    font-size: 12px;

    img {
      height: 12px;
    }
  }
`;

interface Props {
  item: any;
}

const CommentActivity: React.FC<Props> = ({ item: data }) => {
  const { author, likes, comments, reTweets, item, item2 } = data;

  return (
    <Container>
      <header>
        <img src={commented} alt="comment" />

        <img src={author.imageUrl} alt={author.name} />
        <strong>{author.name}</strong>
        <span>{data.date}</span>
      </header>

      <section>
        <p>commented on your post: {data.content}</p>
      </section>

      <CommentActions likes={likes} comments={comments} reTweets={reTweets} item={item} item2={item2} />
    </Container>
  );
};

export default CommentActivity;
