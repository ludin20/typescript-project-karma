import React from 'react';
import styled from 'styled-components';

import { FollowButton, ProfileImage, Actions } from '../index';

import withoutAvatar from '../assets/withoutAvatar.svg';

import PostContent from './PostContent';

const Container = styled.li`
  & + li {
    margin-top: 40px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      strong {
        color: #fff;
        font-size: 16px;
      }

      span {
        color: #6f767e;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
`;

const PostCard: React.FC = ({ id, date, likes, comments, recycles, tips, power, content, author, me, size }: any) => {
  return (
    <Container key={id}>
      <header>
        <div>
          <ProfileImage
            online={author.online || false}
            path={author.imageUrl || author.avatar || withoutAvatar}
            alt={author.name}
          />
          <section>
            <strong>{author.name}</strong>
            <span>
              {author.username} - {date}
            </span>
          </section>
        </div>

        {!me && <FollowButton following={author.following} />}
      </header>

      <PostContent content={content} size={size} />
      <Actions likes={likes} comments={comments} recycles={recycles} tips={tips} power={power} />
    </Container>
  );
};

export default PostCard;
