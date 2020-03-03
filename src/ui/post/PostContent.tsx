import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ size: 'default' | 'small'; numberOfMedias: number }>`
  margin: ${props => (props.size === 'small' ? '10px 0 15px 60px' : '12px 0 40px 60px')};

  div {
    margin-top: 20px;

    display: grid;
    grid-template-columns: ${({ numberOfMedias }) =>
      numberOfMedias < 3 ? `repeat(${numberOfMedias}, 1fr)` : `repeat(3, 1fr)`};
    grid-gap: 24px;
  }
`;

const Text = styled.strong<{ hashtag: boolean; size: 'default' | 'small' }>`
  color: ${props => (props.hashtag ? props.theme.green : '#fff')};
  font-size: ${props => (props.size === 'small' ? '20px' : '24px')};
  font-weight: ${props => (props.size === 'small' ? '500' : 'bold')};
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  border-radius: 25px;
`;

interface Props {
  content: { description: string; hashtags: string[]; medias: string[] };
  size?: 'default' | 'small';
}

const PostContent: React.FC<Props> = ({ content, size }) => {
  return (
    <Container size={size} numberOfMedias={content.medias ? content.medias.length : 1}>
      <p>
        <Text size={size} hashtag={false}>
          {content.description}
        </Text>
        <Text size={size} hashtag>
          {`  ${content.hashtags}`}
        </Text>
      </p>

      <div>{content.medias && content.medias.map((media, index) => <Img key={index} src={media} alt="image" />)}</div>
    </Container>
  );
};

export default PostContent;
