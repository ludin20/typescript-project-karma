import React, { useState } from 'react';
import styled from 'styled-components';

import heart from '../assets/withoulike.svg';
import comment from '../assets/comment.svg';
import retweet from '../assets/retweet.svg';
import tip from '../assets/tip.png';
import rocket from '../assets/rocket.svg';
import share from '../assets/share.svg';

import BoostModal from './actionsModal/BoostModal';
import TipModal from './actionsModal/TipModal';

const Container = styled.div`
  margin-left: 60px;
  width: 85% !important;

  display: flex;
  justify-content: space-between;

  button {
    background: none;
    color: #fff;
    font-size: 15px;
    font-weight: 900;

    display: flex;
    align-items: center;

    span {
      padding-top: 5px;
    }

    img {
      height: 16px;
      width: auto;
      margin-right: 10px;
    }

    &:last-child {
      img {
        margin-right: 0;
      }
    }
  }

  @media (max-width: 550px) {
    width: 100% !important;
    padding-right: 15px;
    margin-left: 0;

    button {
      font-size: 13px;
      img {
        height: 13px;
      }

      span {
        padding-top: 4px;
      }
    }
    button:nth-child(6) {
      display: none;
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

const PostActions: React.FC<Props> = ({ likes, comments, recycles, tips, power, ...props }) => {
  const [tipModalIsOpen, setTipModalIsOpen] = useState(false);
  const [boostModalIsOpen, setBoostModalIsOpen] = useState(false);

  return (
    <>
      <Container {...props}>
        <button>
          <img src={heart} alt="like" />
          <span>{likes} Likes</span>
        </button>

        <button>
          <img src={comment} alt="comment" />
          <span>{comments}</span>
        </button>

        <button>
          <img src={retweet} alt="retweet" />
          <span>{recycles}</span>
        </button>

        <button onClick={() => setTipModalIsOpen(true)}>
          <img src={tip} alt="tip" />
          <span>{tips}</span>
        </button>

        <button onClick={() => setBoostModalIsOpen(true)}>
          <img src={rocket} alt="rocket" />
          <span>{power}</span>
        </button>

        <button>
          <img src={share} alt="share" />
        </button>
      </Container>

      {tipModalIsOpen && <TipModal open={tipModalIsOpen} close={() => setTipModalIsOpen(false)} />}
      {boostModalIsOpen && <BoostModal open={boostModalIsOpen} close={() => setBoostModalIsOpen(false)} />}
    </>
  );
};

export default PostActions;
