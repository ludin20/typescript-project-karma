import React from 'react';
import styled from 'styled-components';

import { Avatar } from '../../ui';

import recycle from '../../assets/recycle.svg';

import Icon from './Icon';

const Container = styled.div`
  margin-top: 40px;

  > img {
    margin: 20px 0 0 93px;
    width: calc(100% - 93px);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
    }

    span {
      color: ${props => props.theme.gray};
      font-size: 16px;
      font-weight: 900;
    }

    p {
      margin-left: 5px;

      strong {
        color: #fff;
        font-size: 16px;
        margin-right: 5px;
      }
    }
  }
`;

interface Props {
  item: any;
}

const RecycleActivity: React.FC<Props> = ({ item }) => {
  const { author, post } = item;

  return (
    <Container>
      <header>
        <div>
          <Icon src={recycle} alt="recycle" />

          <Avatar src={author.avatar} alt={author.name} size="small" />
          <p>
            <strong>{author.name}</strong>
            <span>
              recycled your post: {`"${item.content}"`} - {item.date}
            </span>
          </p>
        </div>
      </header>

      <img src={post.image} alt={item.content} />
    </Container>
  );
};

export default RecycleActivity;
