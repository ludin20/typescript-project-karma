import React from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useRouter } from 'next/router';

import InfinityScroll from '../common/InfinityScroll';
import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';

import playIcon from '../assets/play.svg';

const Section = styled.div`
  position: relative;
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

interface Props {
  renderedRef?: any;
  medias: Array<{ post_id: string; type: string; content: string; thumbnail?: string }>;
  loadMore(): void;
}

const Template: React.FC<Props> = ({ renderedRef, medias, loadMore }) => {
  const router = useRouter();

  return (
    <InfinityScroll length={medias.length} loadMore={loadMore} hasMore={medias.length > 0}>
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
    </InfinityScroll>
  );
};

export default Template;
