import React from 'react';
import styled from 'styled-components';

import commented from '../assets/commented.svg';

import Avatar from '../common/Avatar';

import Icon from './Icon';

const Container = styled.div`
  width: 100%;
  margin-top: 40px;

  display: flex;
  flex-direction: column;

  span {
    color: ${props => props.theme.gray};
    font-size: 16px;
    margin-left: 3px;
  }

  header {
    display: flex;
    align-items: center;

    p {
      margin-left: 5px;
    }
  }

  > p {
    margin-left: 90px;
    color: ${props => props.theme.gray};
    font-size: 16px;
    line-height: 22px;
    font-weight: 900;
  }

  strong {
    color: #fff;
    font-size: 16px;
  }

  @media (max-width: 550px) {
    > p {
      margin-left: 80px;
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
      <header>
        <Icon src={commented} alt="comment" />
        <Avatar src={author.avatar} alt={author.name} size="small" />
        <p>
          <strong>{author.name}</strong>
          <span> {data.date}</span>
        </p>
      </header>

      <p>commented on your post: {data.content}</p>
    </Container>
  );
};

export default CommentActivity;
