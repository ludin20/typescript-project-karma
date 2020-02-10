import React from 'react';
import styled from 'styled-components';

import heart from '../../assets/heart.svg';
import comment from '../../assets/comment.svg';
import retweet from '../../assets/retweet.svg';
import rocket from '../../assets/rocket.svg';
import share from '../../assets/share.svg';

const Container = styled.div`
  margin-left: 60px;

  display: flex;
  justify-content: space-between;

  button {
    background: none;
    color: #fff;
    font-size: 14px;
    font-weight: bold;

    display: flex;
    align-items: center;

    img {
      height: 14px;
      width: auto;
      margin-right: 10px;
    }

    &:last-child {
      img {
        margin-right: 0;
      }
    }
  }
`;

interface Props {
  likes: string | number;
  comments: string | number;
  reTweets: string | number;
  item: string | number;
  item2: string | number;
}

const PostActions: React.FC<Props> = ({ likes, comments, reTweets, item, item2 }) => {
  return (
    <Container>
      <button>
        <img src={heart} alt="like" />
        {likes} Likes
      </button>

      <button>
        <img src={comment} alt="comment" />
        {comments}
      </button>

      <button>
        <img src={retweet} alt="retweet" />
        {reTweets}
      </button>

      <button>
        {/* <img src={item} alt="item" /> */}
        {item}
      </button>

      <button>
        <img src={rocket} alt="rocket" />
        {item2}
      </button>

      <button>
        <img src={share} alt="share" />
      </button>
    </Container>
  );
};

export default PostActions;
