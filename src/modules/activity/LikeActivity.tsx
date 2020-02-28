import React from 'react';
import styled from 'styled-components';

import like from '../../assets/like.svg';
import { Avatar } from '../../ui';

import Icon from './Icon';

const Container = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img:last-child {
    height: 30px;
    width: 30px;
  }

  section {
    display: flex;
    align-items: center;

    p {
      margin-left: 5px;

      strong {
        color: #fff;
        font-size: 16px;
        font-weight: 900;
      }

      span {
        color: ${props => props.theme.gray};
        font-size: 16px;
        font-weight: 900;
      }
    }
  }
`;

interface Props {
  item: any;
}

const LikeActivity: React.FC<Props> = ({ item }) => {
  const { author, post } = item;

  return (
    <Container>
      <section>
        <Icon src={like} alt="Like" />
        <Avatar src={author.avatar} alt={author.name} size="small" />

        <p>
          <strong>{author.name}</strong>
          <span>{`  liked your post: "${item.content}"`} </span>
          <span>{item.date}</span>
        </p>
      </section>

      <img src={post.image} alt="post" />
    </Container>
  );
};

export default LikeActivity;
