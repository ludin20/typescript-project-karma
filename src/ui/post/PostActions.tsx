import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import graphql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useRouter } from 'next/router';

import Row from '../common/Row';
import Space from '../common/Space';
import Text from '../common/Text';

import heart from '../assets/new-heart.svg';
import liked from '../assets/liked.svg';
import comment from '../assets/new-comment.svg';
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
  margin-top: 4px;
  @media (max-width: 550px) {
    font-size: 13px;
  }
`;

const SpaceCss = css`
  @media (max-width: 550px) {
    display: none;
  }
`;

const CREATE_UPVOTE = graphql`
  mutation upVote($post_id: Int) {
    upVote(post_id: $post_id) {
      success
    }
  }
`;

const CREATE_DOWNVOTE = graphql`
  mutation downVote($post_id: Int) {
    downVote(post_id: $post_id) {
      success
    }
  }
`;

interface Props {
  comments: string | number;
  recycles: string | number;
  tips: string | number;
  power: string | number;
  upvote_count: number;
  downvote_count: number;
  voteStatus: number;
}

const PostActions: React.FC<Props> = ({
  upvote_count,
  downvote_count,
  comments,
  recycles,
  tips,
  power,
  voteStatus,
  ...props
}) => {
  const [tipModalIsOpen, setTipModalIsOpen] = useState(false);
  const [boostModalIsOpen, setBoostModalIsOpen] = useState(false);
  const router = useRouter();

  const [createUpvote] = useMutation(CREATE_UPVOTE);
  const [createDownvote] = useMutation(CREATE_DOWNVOTE);

  const handleVote = useCallback(() => {
    if (voteStatus === 0) {
      createUpvote({
        variables: { post_id: router.query.id },
      });
    } else {
      createDownvote({ variables: { post_id: router.query.id } });
    }
  }, [voteStatus, router, createDownvote, createUpvote]);

  return (
    <Row>
      <Space width={60} css={SpaceCss} />
      <Container justify="space-between" {...props}>
        <Row align="center" justify="center">
          <Image src={voteStatus ? liked : heart} alt="like" onClick={handleVote} />
          <ButtonText>{upvote_count - downvote_count} Likes</ButtonText>
        </Row>

        <Row align="center" justify="center">
          <Image src={comment} alt="comment" />
          <ButtonText>{comments}</ButtonText>
        </Row>

        {/* <Row align="center" justify="center">
          <Image src={retweet} alt="retweet" />
          <ButtonText>{recycles}</ButtonText>
        </Row> */}

        <Row align="center" justify="center" onClick={() => setTipModalIsOpen(true)}>
          <Image src={tip} alt="tip" />
          <ButtonText>{tips}</ButtonText>
        </Row>

        <Row align="center" justify="center" onClick={() => setBoostModalIsOpen(true)}>
          <Image src={rocket} alt="rocket" />
          <ButtonText>{power}</ButtonText>
        </Row>

        <Row align="center" justify="center" css={buttonCss}>
          <Image src={share} alt="share" withoutMargin />
        </Row>
      </Container>

      {tipModalIsOpen && <TipModal open={tipModalIsOpen} close={() => setTipModalIsOpen(false)} />}
      {boostModalIsOpen && <BoostModal open={boostModalIsOpen} close={() => setBoostModalIsOpen(false)} />}
    </Row>
  );
};

export default PostActions;
