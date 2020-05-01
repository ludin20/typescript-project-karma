import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

import Avatar from '../common/Avatar';
import FollowButton from '../common/FollowButton';
import Space from '../common/Space';
import Row from '../common/Row';
import Column from '../common/Column';
import Text from '../common/Text';
import FormattedText from '../common/FormattedText';

import { useFormatDistanceStrict, useS3Image } from '../../hooks';

import PostActions from './PostActions';
import PostContent from './PostContent';

const Container = styled.li`
  list-style: none;
  cursor: pointer;
`;

const headerCss = css`
  margin-top: -30px;
`;

const Caption = styled.li`
  margin-left: 82px;
  margin-top: -25px;
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
  view_count: any;
  username: string;
  __typename: string;
}

interface Props {
  post: PostInterface;
  me?: boolean;
  size?: 'default' | 'small';
  withFollowButton?: boolean;
  shouldHideFollowOnMobile?: boolean;
  usdPrice?: number;
  eosPrice?: number;
}

const PostCard: React.FC<Props> = ({ post, me = false, size = 'default', withFollowButton = true, ...props }) => {
  const [data, setData] = useState(post);
  const {
    author,
    author_displayname,
    username,
    created_at,
    description,
    imagehashes,
    videohashes,
    author_profilehash,
    post_id,
  } = post;

  const content = useMemo(() => {
    return { imagehashes, videohashes };
  }, [imagehashes, videohashes]);

  const router = useRouter();

  const formattedDateStrings = useFormatDistanceStrict(created_at).split(' ');
  const formattedDate = formattedDateStrings[0] + formattedDateStrings[1][0];
  const avatar = useS3Image(author_profilehash, 'thumbSmall');

  const onSuccessAction = (action: string, value: number) => {
    switch (action) {
      case 'upVote':
        setData({ ...data, upvote_count: data.upvote_count + value, voteStatus: 1 });
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
    }
  };

  return (
    <Container>
      <Row align="center" justify="space-between">
        <Row align="center">
          <Avatar src={avatar} alt={author_displayname} />
          <Space width={18} />

          <Row
            css={headerCss}
            align="center"
            onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
          >
            <Text color="white" size={25} weight="900">
              {author_displayname}
            </Text>
            <Space width={10} />
            <Text color="lightBlue" size={20}>
              @{username} - {formattedDate}
            </Text>
          </Row>
        </Row>

        {!me && withFollowButton && <FollowButton following={false} shouldHideFollowOnMobile />}
      </Row>
      <Caption>
        <FormattedText content={description} font={{ color: 'white', size: '21px', weight: 'normal' }} />
      </Caption>

      <PostContent
        content={content}
        size={size}
        onClick={() => router.push('/post/[id]', `/post/${post_id}`, { shallow: true })}
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
        usdPrice={props.usdPrice}
        eosPrice={props.eosPrice}
        onSuccessAction={onSuccessAction}
      />
    </Container>
  );
};

export default PostCard;
