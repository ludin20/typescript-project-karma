import React from 'react';
import styled from 'styled-components';

import recycle from '../../assets/recycle.svg';

const Container = styled.div`
  margin-top: 40px;

  > img {
    margin: 20px 0 0 95px;
    width: 85%;
  }

  header {
    display: flex;
    align-items: center;

    img {
      width: 30px;
    }

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
        margin-right: 5px;
      }

      span {
        color: ${props => props.theme.gray};
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
`;

interface Props {
  item: any;
}

const TipActivity: React.FC<Props> = ({ item }) => {
  const { author, post } = item;

  return (
    <Container>
      <header>
        <img src={recycle} alt="recycle" />

        <img src={author.imageUrl} alt={author.name} />
        <p>
          <strong>{author.name}</strong>
          <span>
            recycled your post: {`"${item.content}"`} - {item.date}
          </span>
        </p>
      </header>

      <img src={post.image} alt={item.content} />
    </Container>
  );
};

export default TipActivity;
