import React from 'react';
import styled, { css } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { useS3Images } from '../../hooks';

import ShimmerImage from '../common/ShimmerImage';
import FormattedText from '../common/FormattedText';
import Grid from '../common/Grid';
import Space from '../common/Space';

const Container = styled.div`
  margin: 12px 0 40px 60px;

  @media (max-width: 550px) {
    margin: 12px 0 30px;
  }
`;

const gridCss = css`
  @media (max-width: 550px) {
    grid-gap: 10px;
  }
`;

const contentCss = css`
  @media (max-width: 550px) {
    font-size: 18px;
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

const PostContent: React.FC<Props> = ({ content }) => {
  const medias = useS3Images(content, 'thumbBig');

  return (
    <Container>
      <FormattedText
        content={content.description}
        font={{ color: 'white', size: '24px', weight: 'bold' }}
        contentCss={contentCss}
      />
      {medias.length > 0 && (
        <SkeletonTheme color="#191A19" highlightColor="#333">
          <>
            <Space height={20} />
            <Grid columns={medias.length < 3 ? medias.length : 3} gap="24px" css={gridCss}>
              {medias.map((media, index) => (
                <ShimmerImage key={index} src={media} alt="image" css={imgCss} height={500} />
              ))}
            </Grid>
          </>
        </SkeletonTheme>
      )}
    </Container>
  );
};

export default PostContent;
