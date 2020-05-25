import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import InfinityScroll from '../common/InfinityScroll';
import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';
import { PostCard, Space } from '../../ui';
import Row from '../common/Row';

import playIcon from '../assets/play.svg';

const Section = styled.div`
  position: relative;
`;

const viewPortCss = css`
  justify-content: flex-end;
`;

const viewPortBtnCss = css`
  width: 30px;
  height: 30px;
`;

const PlayButton = styled.img`
  position: absolute;
  width: 10%;
  height: 10%;
  bottom: 5%;
  right: 5%;
  min-width: 30px;
  min-height: 30px;
  max-width: 50px;
  max-height: 50px;
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;

const gridCss = css`
  @media (max-width: 550px) {
    grid-gap: 20px 10px;
  }
`;

const imageCss = css`
  object-fit: cover;
  cursor: pointer;
  width: 100%;
  border-radius: 20px;
  @media (max-width: 550px) {
    &:first-child {
      grid-column: 1 / -1;
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
  video_count: any;
  username: string;
  __typename: string;
}

interface Props {
  renderedRef?: any;
  posts: Array<PostInterface>;
  medias: Array<{ post_id: string; type: string; content: string; thumbnail?: string }>;
  loadMore(): void;
  wax?: number;
  eos?: number;
  liquidBalance?: number;
  upvoted?: Array<string>;
  viewForm?: boolean;
}

const Template: React.FC<Props> = ({
  renderedRef,
  posts,
  medias,
  loadMore,
  wax,
  eos,
  liquidBalance,
  upvoted,
  viewForm,
}) => {
  const router = useRouter();

  return (
    <div>
      <InfinityScroll length={posts.length} loadMore={loadMore} hasMore={posts.length > 0}>
        {viewForm ? (
          <SkeletonTheme color="#191A19" highlightColor="#333">
            <Grid columns="3" gap="24px" align css={gridCss}>
              {medias.map((media, index) => (
                <Section
                  ref={index == 0 ? renderedRef : null}
                  key={String(index)}
                  onClick={() => router.push('/post/[id]', `/post/${media.post_id}`, { shallow: true })}
                >
                  <ShimmerImage
                    src={media.type == 'video' ? media.thumbnail : media.content}
                    alt="discover"
                    css={imageCss}
                    height={renderedRef && renderedRef.current ? renderedRef.current.clientWidth : null}
                    width={renderedRef && renderedRef.current ? renderedRef.current.clientWidth : null}
                  />
                  {media.type == 'video' ? <PlayButton src={playIcon} alt="play" /> : null}
                </Section>
              ))}
            </Grid>
          </SkeletonTheme>
        ) : (
          <div>
            {posts.map((post, index) => (
              <React.Fragment key={String(index)}>
                {index > 0 && <Space height={40} />}
                <PostCard
                  post={post}
                  wax={wax}
                  eos={eos}
                  liquidBalance={Math.floor(liquidBalance)}
                  upvoted={upvoted}
                  withFollowButton={false}
                  isDetails={false}
                />
              </React.Fragment>
            ))}
          </div>
        )}
      </InfinityScroll>
    </div>
  );
};

export default Template;
