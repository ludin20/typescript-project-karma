import React, { useState, useEffect, createRef } from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useS3PostMedias, useFormatDuration } from '../../hooks';
import { playVideo } from '../../services/config';

import ShimmerImage from '../common/ShimmerImage';
import Grid from '../common/Grid';
import Space from '../common/Space';
import Text from '../common/Text';

import playIcon from '../assets/play.svg';
import closeIcon from '../assets/close.svg';

const Container = styled.div`
  margin-left: 80px;
  cursor: pointer;

  @media (max-width: 550px) {
    margin: 0;
  }
`;

const Section = styled.div<{ isDetails?: boolean; active?: boolean }>`
  position: relative;
  display: none;
  ${props =>
    props.isDetails &&
    css`
      display: block;
    `}
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
  border-radius: 25px;
  object-fit: cover;
`;

const PlayButton = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 25px;
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

const VideoViewCounts = styled.div`
  position: absolute;
  background-color: #20252e;
  top: 25px;
  left: 25px;
  border-radius: 15px;
  padding: 4px 14px;
  @media (max-width: 550px) {
    top: 20px;
    left: 20px;
    padding: 3px 10px;
    span {
      font-size: 15px;
    }
  }
`;

const VideoDuration = styled.div`
  position: absolute;
  background-color: #20252e;
  top: 25px;
  right: 25px;
  border-radius: 15px;
  padding: 4px 14px;
  @media (max-width: 550px) {
    top: 20px;
    right: 20px;
    padding: 3px 10px;
    span {
      font-size: 15px;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  position: fixed;
  top: 30px;
  right: 50px;
  z-index: 9999999;
  @media (max-width: 550px) {
    top: 20px;
    right: 20px;
  }

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
  content: { post_id: number; imagehashes: []; videohashes: []; video_count: number };
  size?: 'default' | 'small';
  onClick(): void;
  isDetails: boolean;
  onSuccessAction?(action: string, value: number): void;
}

const PostContent: React.FC<Props> = ({ content, onClick, isDetails, onSuccessAction }) => {
  const medias = useS3PostMedias(content, 'thumbBig');
  const [videoStates, setVideoStates] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setVideoStates(videoStates => medias.map((_, i) => videoStates[i] || { ref: createRef(), active: false }));
    setIsLoaded(true);
    document.addEventListener('keydown', handleEsc, false);

    return () => {
      document.removeEventListener('keydown', handleEsc, false);
    };
  }, []);

  const handleClickVideo = (index: number, post_id: number | string) => {
    playVideo(post_id)
      .then(res => {
        onSuccessAction('playVideo', 1);
        setVideoStates([
          ...videoStates.slice(0, index),
          { ...videoStates[index], active: true },
          ...videoStates.slice(index + 1),
        ]);
        document.body.style.overflow = 'hidden';
      })
      .catch(err => {
        console.log('playVideo action error', err); // eslint-disable-line no-console
      });
  };

  const handleEsc = e => {
    if (e.code == 'Escape') {
      setVideoStates(videoStates => videoStates.map(item => ({ ...item, active: false })));
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
                    media.type == 'video' ? (
                      <div>
                        <Section
                          height={500}
                          key={String(index)}
                          isDetails={!isDetails}
                          onClick={() => handleClickVideo(index, media.post_id)}
                        >
                          <Video
                            ref={videoStates[index].ref}
                            playsInline
                            autoPlay
                            loop
                            height={500}
                            muted
                            controls={videoStates[index].active}
                          >
                            <source src={media.content} type="video/mp4" />
                          </Video>
                          <PlayButton src={playIcon} alt="play" />
                          <VideoViewCounts>
                            <Text color="white" size={17}>
                              {content.video_count + ' views'}
                            </Text>
                          </VideoViewCounts>
                          <VideoDuration>
                            <Text color="white" size={17}>
                              {videoStates[index].ref.current ? useFormatDuration(videoStates[index].ref.current.duration) : useFormatDuration(0)}
                            </Text>
                          </VideoDuration>
                        </Section>
                        <Section
                          key={String(index)}
                          onClick={() => handleClickVideo(index, media.post_id)}
                          isDetails={isDetails}
                          active={videoStates[index].active}
                        >
                          <Video
                            ref={videoStates[index].ref}
                            playsInline
                            autoPlay
                            loop
                            muted={!videoStates[index].active}
                            controls={videoStates[index].active}
                          >
                            <source src={media.content} type="video/mp4" />
                          </Video>
                        </Section>
                      </div>
                    ) : (
                      <Section key={String(index)} isDetails>
                        <ShimmerImage src={media.content} alt="image" css={imgCss} height={500} />
                        {media.type == 'video' ? (
                          <div>
                            <PlayButton src={playIcon} alt="play" />
                            <VideoViewCounts>
                              <Text color="white" size={17}>
                                {content.video_count + ' views'}
                              </Text>
                            </VideoViewCounts>
                            <VideoDuration>
                              <Text color="white" size={17}>
                                {}
                              </Text>
                            </VideoDuration>
                          </div>
                        ) : null}
                      </Section>
                    ),
                  )}
                  {!!videoStates.find(videoState => videoState.active) && (
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
