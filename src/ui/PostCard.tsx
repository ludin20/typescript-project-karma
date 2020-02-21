import React from 'react';
import styled from 'styled-components';

import PostContent from './PostContent';

import withoutAvatar from './assets/withoutAvatar.svg';

import { FollowButton, ProfileImage, Actions } from './index';

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
        font-weight: 900;
      }

      span {
        color: #6f767e;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
`;

export interface PostInterface {
  id: number | string;
  date: number | string | Date;
  likes: number | string;
  comments: number | string;
  recycles: number | string;
  tips: number | string;
  power: number | string;
  content: {
    description: string;
    hashtags: string[];
    medias: string[];
  };
  author: {
    online?: boolean;
    avatar: string;
    name: string;
    username: string;
    following: boolean;
  };
}

interface Props {
  post: PostInterface;
  me?: boolean;
  size?: 'default' | 'small';
}

const PostCard: React.FC<Props> = ({ post, me = false, size = 'default' }) => {
  const { date, likes, comments, recycles, tips, power, content, author } = post;

  return (
    <Container>
      <header>
        <div>
          <ProfileImage
            online={author.online || false}
            path={author.avatar || author.avatar || withoutAvatar}
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
