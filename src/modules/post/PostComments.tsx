import React from 'react';
import styled from 'styled-components';

import { TextInput, ProfileImage, withoutAvatar } from '../../ui';

const Container = styled.div`
  margin-top: 50px;

  li {
    margin: 30px 0;

    display: flex;
    align-items: center;

    section {
      margin-left: 25px;

      display: flex;
      flex-direction: column;

      header {
        display: flex;
        flex-direction: row;

        strong {
          font-size: 22px;
          font-weight: 900;
          color: #fff;
        }

        span {
          margin-left: 8px;
          font-size: 22px;
          color: #6f767e;
        }
      }

      p {
        margin-top: 8px;
        font-size: 20px;
        font-weight: 900;
        color: #fff;
      }
    }
  }
`;

const CreateComment = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled(TextInput)`
  margin-left: 10px;
  border-radius: 100px;
  flex: 1;
  padding: 10px 20px;
`;

interface Props {
  comments: any[];
  avatar: string;
}

const PostComments: React.FC<Props> = ({ comments, avatar }) => {
  return (
    <Container>
      <CreateComment>
        <ProfileImage online={false} path={avatar || withoutAvatar} alt="avatar" />
        <Input placeholder="Write a comment" dark font="small" />
      </CreateComment>

      <ul>
        {comments.map(({ author, ...comment }) => (
          <li key={author.username}>
            <ProfileImage online={false} path={author.avatar || withoutAvatar} alt={author.username} />
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
