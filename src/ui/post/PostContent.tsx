import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { IPFS_S3 } from '../../common/config';
import ShimmerImage from '../common/ShimmerImage';

const Container = styled.div<{ size: 'default' | 'small'; numberOfMedias: number }>`
  margin: ${props => (props.size === 'small' ? '10px 0 15px 60px' : '12px 0 40px 60px')};

  div {
    margin-top: 20px;

    display: grid;
    grid-template-columns: ${({ numberOfMedias }) =>
      numberOfMedias < 3 ? `repeat(${numberOfMedias}, 1fr)` : `repeat(3, 1fr)`};
    grid-gap: 24px;
  }

  @media (max-width: 550px) {
    margin: ${props => (props.size === 'small' ? '10px 0 15px' : '12px 0 30px')};

    div {
      grid-gap: 10px;
    }
  }
`;

const Text = styled.strong<{ hashtag: boolean; size: 'default' | 'small' }>`
  color: ${props => (props.hashtag ? props.theme.green : '#fff')};
  font-size: ${props => (props.size === 'small' ? '20px' : '24px')};
  font-weight: ${props => (props.size === 'small' ? '500' : 'bold')};

  @media (max-width: 550px) {
    font-size: ${props => (props.size === 'small' ? '16px' : '18px')};
  }
`;

const imgCss = css`
  width: 100%;
  height: auto;
  border-radius: 25px;
`;

interface Props {
  content: { description: string; imagehashes: []; videohashes: [] };
  size?: 'default' | 'small';
}

const PostContent: React.FC<Props> = ({ content, size }) => {
  const medias = useMemo(() => {
    if (content.imagehashes && content.imagehashes.length > 0) {
      return content.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/thumbBig.jpg`);
    }

    return [];
  }, [content.imagehashes]);

  const description = useMemo(() => {
    const paragraph = content.description.split('\n').filter(text => text && text);
    return paragraph.map(text => text.split(' ')).filter(text => text && text);
  }, [content.description]);

  return (
    <Container size={size} numberOfMedias={medias.length}>
      {description.map((paragraph, index) => (
        <React.Fragment key={String(index)}>
          <p>
            {paragraph.map((text, index) => (
              <Text key={String(index)} size={size} hashtag={text.startsWith('#')}>
                {`${text} `}
              </Text>
            ))}
          </p>
          {index < description.length - 1 && <br />}
        </React.Fragment>
      ))}

      <SkeletonTheme color="#191A19" highlightColor="#333">
        {medias.length > 0 && (
          <div>
            {medias.map((media, index) => (
              <ShimmerImage key={index} src={media} alt="image" css={imgCss} height={500} />
            ))}
          </div>
        )}
      </SkeletonTheme>
    </Container>
  );
};

export default PostContent;
