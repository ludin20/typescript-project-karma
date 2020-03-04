import React from 'react';
import styled from 'styled-components';

import Avatar from '../common/Avatar';
import FollowButton from '../common/FollowButton';

import PostActions from './PostActions';
import PostContent from './PostContent';

const Container = styled.li`
  list-style: none;

  & + li {
    margin-top: 40px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      strong {
        color: #fff;
        font-size: 18px;
        font-weight: 900;
      }

      span {
        color: #6f767e;
        font-size: 16px;
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
  withFollowButton?: boolean;
}

const PostCard: React.FC<Props> = ({ post, me = false, size = 'default', withFollowButton = true }) => {
  const { date, likes, comments, recycles, tips, power, content, author } = post;

  return (
    <Container>
      <header>
        <div>
          <Avatar online={author.online || false} src={author.avatar} alt={author.name} />
          <section>
            <strong>{author.name}</strong>
            <span>
              {author.username} - {date}
            </span>
          </section>
        </div>

        {!me && withFollowButton && <FollowButton following={author.following} />}
      </header>

      <PostContent content={content} size={size} />
      <PostActions likes={likes} comments={comments} recycles={recycles} tips={tips} power={power} />
    </Container>
  );
};

export default PostCard;
