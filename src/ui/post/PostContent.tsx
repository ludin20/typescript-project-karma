import React, { useState, useEffect, createRef } from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useS3PostMedias } from '../../hooks';

import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';
import Space from '../common/Space';

import playIcon from '../assets/play.svg';
import closeIcon from '../assets/close.svg';

const Container = styled.div`
  margin-left: 80px;
  cursor: pointer;

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

const CloseButton = styled.button`
  background: none;
  position: fixed;
  top: 30px;
  right: 50px;
  z-index: 9999999;

  img {
    width: 30px;
    height: 30px;
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
  const [videoStates, setVideoStates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setVideoStates(videoStates => medias.map((_, i) => videoStates[i] || false));
    setIsLoaded(true);
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  const handleClickVideo = (index: number) => {
    window.setTimeout(() => {
      setVideoStates([...videoStates.slice(0, index), true, ...videoStates.slice(index + 1)]);
      document.body.style.overflow = 'hidden';
    }, 100);
  };

  const handleEsc = e => {
    if (e.code == 'Escape') {
      setVideoStates(videoRefs => videoRefs.map(() => false));
      document.body.style.overflow = 'inherit';
    }
  };

  return !isLoaded ? (
    <div></div>
  ) : (
    <>
      <Container onClick={onClick}>
        {!isLoaded ? (
          <div></div>
        ) : (
          medias.length > 0 && (
            <SkeletonTheme color="#191A19" highlightColor="#333">
              <>
                <Space height={30} css={topSpaceCss} />
                <Grid columns={medias.length < 3 ? medias.length : 3} gap="24px" css={gridCss}>
                  {medias.map((media, index) =>
                    isDetails && media.type == 'video' ? (
                      <Section key={String(index)} onClick={() => handleClickVideo(index)} active={videoStates[index]}>
                        <Video height={500} autoPlay muted={!videoStates[index]} controls={videoStates[index]}>
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
                  {!!videoStates.find(videoState => videoState) && (
                    <CloseButton type="button" onClick={() => handleEsc({ code: 'Escape' })}>
                      <img src={closeIcon} alt="close" />
                    </CloseButton>
                  )}
                </Grid>
              </>
            </SkeletonTheme>
          )
        )}
      </Container>
      <Space height={30} />
    </>
  );
};

export default PostContent;
