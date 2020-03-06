import React from 'react';
import styled from 'styled-components';

import Avatar from '../common/Avatar';

import CreateComment from './CreateComment';

const Container = styled.div`
  margin-top: 30px;

  ul > strong {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }

  li {
    margin: 20px 0;

    display: flex;
    align-items: center;

    section {
      margin-left: 10px;

      display: flex;
      flex-direction: column;

      header {
        display: flex;
        flex-direction: row;

        strong {
          font-size: 16px;
          font-weight: 900;
          color: #fff;
        }

        span {
          margin-left: 8px;
          font-size: 16px;
          color: #6f767e;
        }
      }

      p {
        margin-top: 8px;
        font-size: 15px;
        font-weight: 900;
        color: #fff;
      }
    }
  }

  @media (min-width: 550px) {
    ul > strong {
      display: none;
    }
  }

  @media (max-width: 550px) {
    li {
      margin: 20px 0;

      display: flex;
      align-items: center;

      section {
        header > span {
          font-size: 14px;
        }

        p {
          font-size: 13px;
          font-weight: 500;
          color: #fff;
        }
      }
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  @media (max-width: 550px) {
    width: 40px;
    height: 40px;
    margin-right: 0;
  }
`;

interface Props {
  comments: any[];
  avatar: string;
}

const PostComments: React.FC<Props> = ({ comments, avatar }) => {
  return (
    <Container>
      <CreateComment avatar={avatar} />

      <ul>
        <strong>All comments</strong>
        {comments.map(({ author, ...comment }) => (
          <li key={author.username}>
            <StyledAvatar src={author.avatar} alt={author.username} />
            <section>
              <header>
                <strong>{author.username}</strong>
                <span>{`${comment.time}`}</span>
              </header>
              <p>{comment.content}</p>
            </section>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default PostComments;
