import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useS3PostMedias } from '../../hooks';

import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';
import Space from '../common/Space';

import playIcon from '../assets/play.svg';

const Container = styled.div`
  margin: -27px 0 0 80px;

  @media (max-width: 550px) {
    margin: 0;
  }
`;

const Section = styled.div<{ active?: boolean }>`
  position: relative;
  ${props =>
    props.active &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999999;
      background: black;
      display: flex;
      justify-content: center;
      video {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    `}
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  border-radius: 25px;
`;

const PlayButton = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 550px) {
    width: 40px;
    height: 40px;
  }
`;

const gridCss = css`
  @media (max-width: 550px) {
    grid-gap: 10px;
  }
`;

const imgCss = css`
  width: 100%;
  height: auto;
  border-radius: 25px;
  align-self: stretch;
`;

const topSpaceCss = css`
  @media (max-width: 550px) {
    height: 20px;
  }
`;

interface Props {
  content: { post_id: number; imagehashes: []; videohashes: [] };
  size?: 'default' | 'small';
  onClick(): void;
  isDetails: boolean;
}

const PostContent: React.FC<Props> = ({ content, onClick, isDetails }) => {
  const medias = useS3PostMedias(content, 'thumbBig');
  const [active, setActive] = useState(false);

  const handleEsc = e => {
    if (e.code == 'Escape') {
      setActive(false);
      document.body.style.overflow = 'inherit';
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  return (
    <>
      <Container onClick={onClick}>
        {medias.length > 0 && (
          <SkeletonTheme color="#191A19" highlightColor="#333">
            <>
              <Space height={50} css={topSpaceCss} />
              <Grid columns={medias.length < 3 ? medias.length : 3} gap="24px" css={gridCss}>
                {medias.map((media, index) =>
                  isDetails && media.type == 'video' ? (
                    <Section
                      key={String(index)}
                      onClick={() =>
                        window.setTimeout(() => {
                          setActive(true);
                          document.body.style.overflow = 'hidden';
                        }, 100)
                      }
                      active={active}
                    >
                      <Video height={500} autoPlay muted={!active} controls={active}>
                        <source src={media.content} type="video/mp4" />
                      </Video>
                    </Section>
                  ) : (
                    <Section key={String(index)}>
                      <ShimmerImage
                        src={media.type == 'video' ? media.thumbnail : media.content}
                        alt="image"
                        css={imgCss}
                        height={500}
                      />
                      {media.type == 'video' ? <PlayButton src={playIcon} alt="play" /> : null}
                    </Section>
                  ),
                )}
              </Grid>
            </>
          </SkeletonTheme>
        )}
      </Container>
      <Space height={30} />
    </>
  );
};

export default PostContent;
