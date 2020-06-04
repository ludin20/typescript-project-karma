import React, { useMemo, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { useS3PostMedias } from '../../hooks';
import Avatar from '../common/Avatar';
import FollowButton from '../common/FollowButton';
import Space from '../common/Space';
import Row from '../common/Row';
import Column from '../common/Column';
import Text from '../common/Text';
import FormattedText from '../common/FormattedText';
import { useFormatDistanceStrict, useS3Image } from '../../hooks';
import { RootState } from '../../store/ducks/rootReducer';

import CreateComment from './CreateComment';


import PostActions from './PostActions';
import PostContent from './PostContent';

const Container = styled.ul`
  list-style: none;
  width: 100%;
  background: ${props => props.theme.dark};
  border-radius: 25px 25px 25px 25px;
  padding: 20px;
  max-width: 1105px;
`;

const headerCss = css`
  margin-top: -30px;
  @media (max-width: 550px) {
    display: initial;
    margin-top: -4px;
    span:nth-child(1) {
      font-size: 23px;
    }
    span {
      font-size: 17px;
    }
    div:nth-child(2) {
      height: 4px;
    }
  }
`;

const usernameCSS = css`
  color: #6f767e;
  font-size: 16px;
`;

const Caption = styled.li`
  overflow: hidden;
  @media (max-width: 550px) {
    margin-left: 0;
    span {
      font-size: 18px;
    }
  }
`;

const Clickable = styled.div`
  cursor: pointer;
`;

export interface PostInterface {
  post_id: number;
  author: string;
  author_displayname: string;
  author_profilehash: string;
  description: string;
  voteStatus: any;
  created_at: string;
  last_edited_at: any;
  imagehashes: [];
  videohashes: [];
  category_ids: [];
  upvote_count: number;
  downvote_count: number;
  comment_count: number;
  tip_count: number;
  video_count: any;
  username: string;
  __typename: string;
}

interface Props {
  post: PostInterface;
  me?: boolean;
  size?: 'default' | 'small';
  withFollowButton?: boolean;
  shouldHideFollowOnMobile?: boolean;
  wax?: number;
  eos?: number;
  liquidBalance?: number;
  upvoted?: Array<string>;
  isDetails: boolean;
  onCommentAdded?(text: string): void;
}

const PostCard: React.FC<Props> = ({
  post,
  me = false,
  size = 'default',
  withFollowButton = true,
  onCommentAdded,
  ...props
}) => {
  const [data, setData] = useState(post);
  const {
    author,
    author_displayname,
    username,
    created_at,
    description,
    imagehashes,
    videohashes,
    video_count,
    author_profilehash,
    post_id,
  } = data;

  const content = useMemo(() => {
    return { post_id, imagehashes, videohashes, video_count };
  }, [post_id, imagehashes, videohashes, video_count]);

  const router = useRouter();

  const formattedDateStrings = useFormatDistanceStrict(created_at).split(' ');
  const formattedDate = formattedDateStrings[0] + formattedDateStrings[1][0];
  const avatar = useS3Image(author_profilehash, 'thumbSmall');
  const { hash } = useSelector((state: RootState) => state.user.profile);
  const userAvatar = useS3Image(hash, 'thumbSmall');

  useEffect(() => setData(post), [post]);

  const onSuccessAction = (action: string, value: number) => {
    switch (action) {
      case 'upVote':
        setData({ ...data, upvote_count: data.upvote_count + value, voteStatus: data.voteStatus + value });
        break;
      case 'comment':
        setData({ ...data, comment_count: data.comment_count + value });
        break;
      case 'tip':
        setData({ ...data, tip_count: data.tip_count + value });
        break;
      case 'boost':
        setData({ ...data, tip_count: data.tip_count + value });
        break;
      case 'playVideo':
        setData({ ...data, video_count: data.video_count + value });
        break;
    }
  };

  return (
    <Container>
      <Row align="center" justify="space-between">
        <Row
          align="center"
          onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
        >
          <Clickable>
            <Avatar src={avatar} alt={author_displayname} size="small" />
          </Clickable>
          <Space width={18} />

          <Clickable>
            <Text color="white" size={16} weight="900">
              {author_displayname}
            </Text>
            <Space height={5} />
            <Text css={usernameCSS}>
              @{username} - {formattedDate}
            </Text>
          </Clickable>
        </Row>

        {!me && withFollowButton && <FollowButton following={false} shouldHideFollowOnMobile />}
      </Row>
      <Space height={25} />
      <Caption>
        <FormattedText
          content={description}
          post_id={post_id}
          font={{ color: 'white', size: '19px', weight: 'normal' }}
        />
      </Caption>

      <PostContent
        isDetails={props.isDetails}
        content={content}
        size={size}
        onClick={() => {
          const media = useS3PostMedias(content, 'thumbBig');
          if (!props.isDetails && media[0].type != 'video')
            router.push('/post/[id]', `/post/${post_id}`, { shallow: true });
        }}
        onSuccessAction={onSuccessAction}
      />
      <PostActions
        postId={post_id}
        author={author}
        upvote_count={data.upvote_count}
        downvote_count={data.downvote_count}
        comments={data.comment_count}
        recycles={0}
        tips={data.tip_count}
        power={0}
        voteStatus={data.voteStatus}
        wax={props.wax}
        eos={props.eos}
        liquidBalance={props.liquidBalance}
        upvoted={props.upvoted}
        isDetails={props.isDetails}
        onSuccessAction={onSuccessAction}
      />
      <Space height={25} />
      <div>
        <CreateComment
          avatar={userAvatar}
          post_id={post_id}
          isDetailPage={props.isDetails}
          onSuccessAction={onSuccessAction}
          oncommandAddedAction={onCommentAdded}
        />
      </div>
    </Container>
  );
};

export default PostCard;
