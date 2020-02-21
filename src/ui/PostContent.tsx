import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ size: 'default' | 'small' }>`
  margin: ${props => (props.size === 'small' ? '10px 0 15px 60px' : '20px 0 30px 60px')};

  div {
    max-width: 600px;
    margin-top: 15px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 24px;
  }
`;

const Text = styled.strong<{ hashtag: boolean; size: 'default' | 'small' }>`
  color: ${props => (props.hashtag ? props.theme.green : '#fff')};
  font-size: ${props => (props.size === 'small' ? '16px' : '20px')};
`;

const Img = styled.img<{ divider: number }>`
  width: calc((560px / 3) - 20px);
  height: auto;
  border-radius: 25px;

  & + img {
    margin-left: 10px;
  }
`;

interface Props {
  content: { description: string; hashtags: string[]; medias: string[] };
  size?: 'default' | 'small';
}

const PostContent: React.FC<Props> = ({ content, size }) => {
  return (
    <Container size={size}>
      <p>
        <Text size={size} hashtag={false}>
          {content.description}
        </Text>
        <Text size={size} hashtag>
          {`  ${content.hashtags}`}
        </Text>
      </p>

      <div>
        {content.medias &&
          content.medias.map((media, index) => (
            <Img key={index} src={media} alt="image" divider={content.medias.length} />
          ))}
      </div>
    </Container>
  );
};

export default PostContent;
