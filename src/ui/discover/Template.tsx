import React from 'react';
import { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

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
  width: 100%;
  border-radius: 20px;
  @media (max-width: 550px) {
    &:first-child {
      grid-column: 1 / -1;
    }
  }
`;

interface Props {
  medias: string[];
  loadMore(): void;
}

const Template: React.FC<Props> = ({ medias, loadMore }) => {
  return (
    <InfinityScroll length={medias.length} loadMore={loadMore}>
      <SkeletonTheme color="#191A19" highlightColor="#333">
        <Space height={30} />
        <Grid columns="3" gap="24px" align css={gridCss}>
          {medias.map((image, index) => (
            <ShimmerImage key={String(index)} src={image} alt="discover" css={imageCss} height={200} width={200} />
          ))}
        </Grid>
      </SkeletonTheme>
    </InfinityScroll>
  );
};

export default Template;
