import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 10px 0 30px 60px;

  div {
    max-width: 600px;
    margin-top: 15px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Text = styled.strong<{ hashtag: boolean }>`
  color: ${props => (props.hashtag ? props.theme.green : '#fff')};
  font-size: 20px;
  font-weight: bold;
`;

const Img = styled.img<{ divider: number }>`
  width: ${props => `calc((100%/${props.divider}) - 5px)`};
  height: auto;
  border-radius: 25px;

  & + img {
    margin-left: 10px;
  }
`;

interface Props {
  content: { description: string; hashtags: string[]; medias: string[] };
}

const PostContent: React.FC<Props> = ({ content }) => {
  return (
    <Container>
      <p>
        <Text hashtag={false}>{content.description}</Text>
        <Text hashtag> {content.hashtags}</Text>
      </p>

      <div>
        {content.medias.map((media, index) => (
          <Img key={index} src={media} alt="image" divider={content.medias.length} />
        ))}
      </div>
    </Container>
  );
};

export default PostContent;
