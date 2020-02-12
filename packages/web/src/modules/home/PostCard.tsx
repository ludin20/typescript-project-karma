import React from 'react';
import styled from 'styled-components';
import { FollowButton, ProfileImage, Actions } from '@karma/ui';

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

const PostCard: React.FC = ({ id, date, likes, comments, reTweets, item, item2, content, author }: any) => {
  return (
    <Container key={id}>
      <header>
        <div>
          <ProfileImage online={author.online} path={author.imageUrl} alt={author.name} />
          <section>
            <strong>{author.name}</strong>
            <span>
              {author.username} - {date}
            </span>
          </section>
        </div>

        <FollowButton following={author.following} />
      </header>

      <PostContent content={content} />
      <Actions likes={likes} comments={comments} reTweets={reTweets} item={item} item2={item2} />
    </Container>
  );
};

export default PostCard;
