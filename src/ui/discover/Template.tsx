import React from 'react';
import { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/router';

import InfinityScroll from '../common/InfinityScroll';
import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';
import Space from '../common/Space';

const gridCss = css`
  @media (max-width: 550px) {
    grid-gap: 20px 10px;
  }
`;

const imageCss = css`
  cursor: pointer;
  width: 100%;
  border-radius: 20px;
  @media (max-width: 550px) {
    &:first-child {
      grid-column: 1 / -1;
    }
  }
`;

interface Props {
  medias: Array<{ post_id: string; content: string }>;
  loadMore(): void;
}

const Template: React.FC<Props> = ({ medias, loadMore }) => {
  const router = useRouter();

  return (
    <InfinityScroll length={medias.length} loadMore={loadMore} hasMore={medias.length > 0}>
      <SkeletonTheme color="#191A19" highlightColor="#333">
        <Space height={30} />
        <Grid columns="3" gap="24px" align css={gridCss}>
          {medias.map((media, index) => (
            <ShimmerImage
              key={String(index)}
              src={media.content}
              alt="discover"
              css={imageCss}
              height={200}
              width={200}
              onClick={() => router.push('/post/[id]', `/post/${media.post_id}`, { shallow: true })}
            />
          ))}
        </Grid>
      </SkeletonTheme>
    </InfinityScroll>
  );
};

export default Template;
