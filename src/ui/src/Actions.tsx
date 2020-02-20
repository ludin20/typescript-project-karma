import React from 'react';
import styled from 'styled-components';

import heart from '../assets/withoulike.svg';
import comment from '../assets/comment.svg';
import retweet from '../assets/retweet.svg';
import tip from '../assets/tip.png';
import rocket from '../assets/rocket.svg';
import share from '../assets/share.svg';

const Container = styled.div`
  margin-left: 60px;
  width: 85%;

  display: flex;
  justify-content: space-between;

  button {
    background: none;
    color: #fff;
    font-size: 14px;
    font-weight: 900;

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
  recycles: string | number;
  tips: string | number;
  power: string | number;
}

const Actions: React.FC<Props> = ({ likes, comments, recycles, tips, power, ...props }) => {
  return (
    <Container {...props}>
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
        {recycles}
      </button>

      <button>
        <img src={tip} alt="tip" />
        {tips}
      </button>

      <button>
        <img src={rocket} alt="rocket" />
        {power}
      </button>

      <button>
        <img src={share} alt="share" />
      </button>
    </Container>
  );
};

export default Actions;
