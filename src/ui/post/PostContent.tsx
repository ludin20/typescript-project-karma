import React, { useState, useEffect, createRef } from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useS3PostMedias } from '../../hooks';

import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';
import Space from '../common/Space';

import playIcon from '../assets/play.svg';

const Container = styled.div`
  margin-left: 80px;
  cursor: pointer;

  @media (max-width: 550px) {
    margin: 0;
  }
`;

const Section = styled.div`
  position: relative;
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
  const [videoRefs, setVideoRefs] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setVideoRefs(videoRefs => medias.map((_, i) => videoRefs[i] || { ref: createRef(), active: false }));
    setIsLoaded(true);
  }, []);

  const handleClickVideo = (index: number) => {
    if (videoRefs[index] && videoRefs[index].ref && videoRefs[index].ref.current) {
      const elem = videoRefs[index].ref.current;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }

      window.setTimeout(
        () =>
          setVideoRefs([
            ...videoRefs.slice(0, index),
            { ...videoRefs[index], active: true },
            ...videoRefs.slice(index + 1),
          ]),
        100,
      );
    }
  };

  const exitHandler = () => {
    setVideoRefs(videoRefs => videoRefs.map(item => ({ ...item, active: false })));
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
    document.addEventListener('webkitfullscreenchange', exitHandler, false);

    return () => {
      document.removeEventListener('fullscreenchange', exitHandler, false);
      document.removeEventListener('mozfullscreenchange', exitHandler, false);
      document.removeEventListener('MSFullscreenChange', exitHandler, false);
      document.removeEventListener('webkitfullscreenchange', exitHandler, false);
    };
  }, []);

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
                      <Section key={String(index)} onClick={() => handleClickVideo(index)}>
                        <Video
                          ref={videoRefs[index].ref}
                          height={500}
                          autoPlay
                          muted={!videoRefs[index].active}
                          controls={videoRefs[index].active}
                        >
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
          )
        )}
      </Container>
      <Space height={30} />
    </>
  );
};

export default PostContent;
