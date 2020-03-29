import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Row from '../common/Row';
import Space from '../common/Space';
import Text from '../common/Text';

import heart from '../assets/withoulike.svg';
import comment from '../assets/comment.svg';
import retweet from '../assets/retweet.svg';
import tip from '../assets/tip.png';
import rocket from '../assets/rocket.svg';
import share from '../assets/share.svg';

import BoostModal from './actionsModal/BoostModal';
import TipModal from './actionsModal/TipModal';

const Container = styled(Row)`
  width: 85% !important;

  @media (max-width: 550px) {
    width: 100% !important;
    padding-right: 15px;
  }
`;

const buttonCss = css`
  @media (max-width: 550px) {
    display: none;
  }
`;

const Image = styled.img<{ withoutMargin?: boolean }>`
  height: 16px;
  width: auto;
  margin-right: ${p => (p.withoutMargin ? 0 : '10px')};
`;

const ButtonText = styled(Text).attrs({
  color: 'white',
  size: 15,
  weight: '900',
})`
  @media (max-width: 550px) {
    font-size: 13px;
  }
`;

const SpaceCss = css`
  @media (max-width: 550px) {
    display: none;
  }
`;

interface Props {
  comments: string | number;
  recycles: string | number;
  tips: string | number;
  power: string | number;
  upvote_count: number;
  downvote_count: number;
}

const PostActions: React.FC<Props> = ({ upvote_count, downvote_count, comments, recycles, tips, power, ...props }) => {
  const [tipModalIsOpen, setTipModalIsOpen] = useState(false);
  const [boostModalIsOpen, setBoostModalIsOpen] = useState(false);

  return (
    <Row>
      <Space width={60} css={SpaceCss} />
      <Container justify="space-between" {...props}>
        <Row>
          <Image src={heart} alt="like" />
          <ButtonText>{upvote_count - downvote_count} Likes</ButtonText>
        </Row>

        <Row>
          <Image src={comment} alt="comment" />
          <ButtonText>{comments}</ButtonText>
        </Row>

        <Row>
          <Image src={retweet} alt="retweet" />
          <ButtonText>{recycles}</ButtonText>
        </Row>

        <Row onClick={() => setTipModalIsOpen(true)}>
          <Image src={tip} alt="tip" />
          <ButtonText>{tips}</ButtonText>
        </Row>

        <Row onClick={() => setBoostModalIsOpen(true)}>
          <Image src={rocket} alt="rocket" />
          <ButtonText>{power}</ButtonText>
        </Row>

        <Row css={buttonCss}>
          <Image src={share} alt="share" withoutMargin />
        </Row>
      </Container>

      {tipModalIsOpen && <TipModal open={tipModalIsOpen} close={() => setTipModalIsOpen(false)} />}
      {boostModalIsOpen && <BoostModal open={boostModalIsOpen} close={() => setBoostModalIsOpen(false)} />}
    </Row>
  );
};

export default PostActions;
