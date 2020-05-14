import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cookie from 'js-cookie';
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
import SuccessModal from '../wallet/SendMoneyModal/SuccessModal';

import { tx, logtask } from '../../services/config';
import karmaApi from '../../services/api';
import { KARMA_AUTHOR, TOKEN_CONTRACT } from '../../common/config';
import { actionRequest, actionSuccess, actionFailure } from '../../store/ducks/action';
import { updateProfileSuccess } from '../../store/ducks/user';

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
  height: 17px;
  width: 17px;
  margin-right: ${p => (p.withoutMargin ? 0 : '10px')};
  cursor: pointer;
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
  postId: number;
  author: string;
  comments: string | number;
  recycles: string | number;
  tips: string | number;
  power: string | number;
  upvote_count: number;
  downvote_count: number;
  voteStatus: number;
  wax?: number;
  eos?: number;
  liquidBalance?: number;
  upvoted?: Array<string>;
  isDetails: boolean;
  onSuccessAction(action: string, value: number): void;
}

const PostActions: React.FC<Props> = ({
  postId,
  author,
  upvote_count,
  downvote_count,
  comments,
  tips,
  power,
  voteStatus,
  onSuccessAction,
  wax,
  eos,
  liquidBalance,
  upvoted,
  isDetails,
  ...props
}) => {
  const accountName = cookie.get(KARMA_AUTHOR);
  const dispatch = useDispatch();
  const [tipModalIsOpen, setTipModalIsOpen] = useState(false);
  const [boostModalIsOpen, setBoostModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [value, setValue] = useState({ karma: 0, usd: 0 });
  const [to, setTo] = useState('');

  const router = useRouter();

  const [createUpvote] = useMutation(CREATE_UPVOTE);
  const [createDownvote] = useMutation(CREATE_DOWNVOTE);

  const handleVote = () => {
    if (voteStatus === 0) {
      onSuccessAction('upVote', 1);
      createUpvote({ variables: { post_id: postId } })
        .then(res => {
          const data = {
            upvoted: [...upvoted, postId],
          };
          dispatch(updateProfileSuccess(data));
        })
        .catch(err => onSuccessAction('upVote', -1));
    } else {
      return;
      createDownvote({ variables: { post_id: router.query.id } });
    }
  };

  const handleTip = (value: number) => {
    tipAccount(value, false);
  };

  const handleBoost = (value: number) => {
    tipAccount(value, true);
  };

  const tipAccount = async (amount, isBoost) => {
    dispatch(actionRequest());
    const isOwn = accountName == author;
    let to = isOwn ? 'karmapromote' : author;
    let memo = isOwn ? 'Boost Post' : 'Tip';
    if (isBoost) {
      to = 'karmapromote';
      memo = 'Boost Post';
    }

    const result = await tx(
      'transfer',
      {
        to: to,
        quantity: `${Number(amount).toFixed(4)} KARMA`,
        memo: memo,
      },
      'from',
      TOKEN_CONTRACT,
    );

    if (result) {
      // update post tip count
      const postTipData = {
        author: author,
        postId: postId,
        tipAmount: amount,
        trxId: result.transaction_id,
        blockTime: result.processed.action_traces[0].block_time,
      };

      karmaApi
        .post('/post/tip', postTipData)
        .then(response => {
          logtask(null, '{"tip":"post"}');
          if (response.status === 200) {
            onSuccessAction(tipModalIsOpen ? 'tip' : 'boost', amount);
            const walledData = {
              liquidBalance: liquidBalance - amount,
            };
            dispatch(updateProfileSuccess(walledData));
            dispatch(actionSuccess());
            tipModalIsOpen ? setTipModalIsOpen(false) : setBoostModalIsOpen(false);
            setValue({ karma: amount, usd: amount });
            setTo(to);
          } else {
            dispatch(actionFailure());
            tipModalIsOpen ? setTipModalIsOpen(false) : setBoostModalIsOpen(false);
          }
        })
        .catch(err => {
          dispatch(actionFailure());
          tipModalIsOpen ? setTipModalIsOpen(false) : setBoostModalIsOpen(false);
        });
    } else {
      dispatch(actionFailure());
      tipModalIsOpen ? setTipModalIsOpen(false) : setBoostModalIsOpen(false);
    }
  };

  return (
    <Row>
      <Space width={80} css={SpaceCss} />
      <Container justify="space-between" {...props}>
        <Row align="center" justify="center">
          <Image src={voteStatus ? liked : heart} alt="like" onClick={handleVote} />
          <ButtonText>{upvote_count - downvote_count} Likes</ButtonText>
        </Row>

        <Row align="center" justify="center">
          <Image
            src={comment}
            alt="comment"
            onClick={() => {
              if (!isDetails) router.push('/post/[id]', `/post/${postId}`, { shallow: true });
            }}
          />
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

      {tipModalIsOpen && (
        <TipModal
          wax={wax}
          eos={eos}
          liquidBalance={liquidBalance}
          open={tipModalIsOpen}
          close={() => setTipModalIsOpen(false)}
          onSubmit={handleTip}
        />
      )}
      {boostModalIsOpen && (
        <BoostModal
          wax={wax}
          eos={eos}
          liquidBalance={liquidBalance}
          open={boostModalIsOpen}
          close={() => setBoostModalIsOpen(false)}
          onSubmit={handleBoost}
        />
      )}
      {successModalIsOpen && (
        <SuccessModal open close={() => setSuccessModalIsOpen(false)} value={value} to={to} action="send" />
      )}
    </Row>
  );
};

export default PostActions;
