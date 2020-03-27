import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import Avatar from '../common/Avatar';
import FollowButton from '../common/FollowButton';
import Space from '../common/Space';

import { useFormatDistance, useS3Image } from '../../hooks';

import PostActions from './PostActions';
import PostContent from './PostContent';

const Container = styled.li`
  list-style: none;
  cursor: pointer;

  & + li {
    margin-top: 40px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      strong {
        color: #fff;
        font-size: 18px;
        font-weight: 900;
      }

      span {
        color: #6f767e;
        font-size: 16px;
      }
    }
  }
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
  } = post;

  const content = useMemo(() => {
    return { description, imagehashes, videohashes };
  }, [description, imagehashes, videohashes]);

  const router = useRouter();

  const formattedDate = useFormatDistance(created_at);
  const avatar = useS3Image(author_profilehash, 'thumbSmall');

  return (
    <Container onClick={() => router.push(`/post/${post_id}`)}>
      <header>
        <div>
          <Avatar src={avatar} alt={author_displayname} />
          <Space width={10} />
          <section>
            <strong>{author_displayname}</strong>
            <span>
              {username} - {formattedDate}
            </span>
          </section>
        </div>

        {!me && withFollowButton && <FollowButton following={false} shouldHideFollowOnMobile />}
      </header>
      <PostContent content={content} size={size} />
      <PostActions
        upvote_count={upvote_count}
        downvote_count={downvote_count}
        comments={comment_count}
        recycles={0}
        tips={tip_count}
        power={0}
      />
    </Container>
  );
};

export default PostCard;
