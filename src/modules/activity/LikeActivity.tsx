import React from 'react';
import styled from 'styled-components';

import like from '../../assets/like.svg';

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;

  img {
    width: 30px;
  }

  section {
    display: flex;
    align-items: center;

    img:nth-child(2) {
      margin-left: 20px;
      height: 30px;
      border-radius: 50%;
    }

    p {
      margin-left: 15px;

      strong {
        color: #fff;
        font-size: 14px;
        font-weight: 900;
      }

      span {
        margin-left: 10px;
        color: ${props => props.theme.gray};
        font-size: 14px;
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
        <img src={like} alt="Like" />
        <img src={author.imageUrl} alt={author.name} />

        <p>
          <strong>{author.name}</strong>
          <span>liked your post: {`"${item.content}"`} </span>
          <span>{item.date}</span>
        </p>
      </section>

      <img src={post.image} alt="post" />
    </Container>
  );
};

export default LikeActivity;
