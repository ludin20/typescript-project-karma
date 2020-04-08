import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Avatar from '../common/Avatar';
import FollowButton from '../common/FollowButton';
import Space from '../common/Space';
import Row from '../common/Row';
import Column from '../common/Column';
import Text from '../common/Text';

import { useFormatDistance, useS3Image } from '../../hooks';

import PostActions from './PostActions';
import PostContent from './PostContent';

const Container = styled.li`
  list-style: none;
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
}

const PostCard: React.FC<Props> = ({ post, me = false, size = 'default', withFollowButton = true }) => {
  const {
    author,
    author_displayname,
    username,
    created_at,
    description,
    imagehashes,
    videohashes,
    author_profilehash,
    comment_count,
    upvote_count,
    downvote_count,
    tip_count,
    post_id,
    voteStatus,
  } = post;

  const content = useMemo(() => {
    return { description, imagehashes, videohashes };
  }, [description, imagehashes, videohashes]);

  const router = useRouter();

  const formattedDate = useFormatDistance(created_at);
  const avatar = useS3Image(author_profilehash, 'thumbSmall');

  return (
    <Container>
      <Row align="center" justify="space-between">
        <Row align="center">
          <Avatar src={avatar} alt={author_displayname} />
          <Space width={10} />

          <Row
            align="center"
            onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
          >
            <Text color="white" size={18} weight="900">
              {author_displayname}
            </Text>
            <Space width={5} />
            <Text color="lightBlue" size={16}>
              @{username} - {formattedDate}
            </Text>
          </Row>
        </Row>

        {!me && withFollowButton && <FollowButton following={false} shouldHideFollowOnMobile />}
      </Row>

      <PostContent
        content={content}
        size={size}
        onClick={() => router.push('/post/[id]', `/post/${post_id}`, { shallow: true })}
      />
      <PostActions
        upvote_count={upvote_count}
        downvote_count={downvote_count}
        comments={comment_count}
        recycles={0}
        tips={tip_count}
        power={0}
        voteStatus={voteStatus}
      />
    </Container>
  );
};

export default PostCard;
