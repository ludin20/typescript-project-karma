import React from 'react';
import styled from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import InfinityScroll from '../common/InfinityScroll';
import ShimmerImage from '../common/ShimmerImage';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin-top: 30px;

  img {
    width: 100%;
  }

  @media (max-width: 550px) {
    grid-gap: 20px 10px;

    img:first-child {
      grid-column: 1 / -1;
    }
  }
`;

interface Props {
  medias: string[];
  loadMore(): void;
}

const Grid: React.FC<Props> = ({ medias, loadMore }) => {
  return (
    <InfinityScroll length={medias.length} loadMore={loadMore}>
      <SkeletonTheme color="#191A19" highlightColor="#333">
        <Container>
          {medias.map((image, index) => (
            <ShimmerImage key={String(index)} src={image} alt="discover" />
          ))}
        </Container>
      </SkeletonTheme>
    </InfinityScroll>
  );
};

export default Grid;
