import React, { useCallback } from 'react';
import { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/router';

import Grid from '../common/Grid';
import InfinityScroll from '../common/InfinityScroll';
import ShimmerImage from '../common/ShimmerImage';
import { useS3Image } from '../../hooks';

const containerCss = css`
  @media (max-width: 550px) {
    grid-gap: 10px;
  }
`;

const imageCss = css`
  width: 100%;
  border-radius: 20px;
  cursor: pointer;
`;

interface Props {
  posts: { post_id: string; imagehashes: string[] }[];
}

const ProfileMedia: React.FC<Props> = ({ posts }) => {
  const router = useRouter();

  const handleClick = useCallback(
    post_id => {
      const href = '/post/[id]';
      const as = `/post/${post_id}`;

      router.push(href, as, { shallow: true });
    },
    [router],
  );

  const Media = ({ hash, onClick }) => {
    const media = useS3Image(hash, 'thumbBig');

    return <ShimmerImage onClick={onClick} src={media} alt="post" css={imageCss} height={200} width={200} />;
  };

  return (
    <InfinityScroll length={posts.length} hasMore={false} loadMore={null}>
      <SkeletonTheme color="#191A19" highlightColor="#333">
        <Grid columns="3" gap="24px" align css={containerCss}>
          {posts.map(
            post =>
              post.imagehashes[0] && (
                <Media onClick={() => handleClick(post.post_id)} key={post.post_id} hash={post.imagehashes[0]} />
              ),
          )}
        </Grid>
      </SkeletonTheme>
    </InfinityScroll>
  );
};

export default ProfileMedia;
