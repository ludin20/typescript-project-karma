import React from 'react';
import { css } from 'styled-components';

import { useS3Image, useFormatDistance } from '../../hooks';
import Row from '../common/Row';
import Avatar from '../common/Avatar';
import Space from '../common/Space';
import Column from '../common/Column';
import Text from '../common/Text';
import FormattedText from '../common/FormattedText';

const avatarCss = css`
  @media (max-width: 550px) {
    width: 40px;
    height: 40px;
  }
`;

const dateCss = css`
  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

const formattedTextCss = css`
  @media (max-width: 550px) {
    font-size: 13px;
    font-weight: 500;
  }
`;

interface Props {
  author: string;
  author_profilehash: string;
  created_at: string;
  text: string;
}

const Comment: React.FC<Props> = ({ author_profilehash, author, created_at, text }) => {
  const avatar = useS3Image(author_profilehash, 'thumbSmall');
  const formattedDate = useFormatDistance(created_at);

  return (
    <Row align="center">
      <Avatar css={avatarCss} src={avatar} alt={author} />
      <Space width={10} />

      <Column>
        <Row>
          <Text size={16} weight="900" color="white">
            {author}
          </Text>
          <Space width={10} />

          <Text size={16} color="midGray" css={dateCss}>
            {formattedDate}
          </Text>
        </Row>
        <Space height={10} />

        <FormattedText
          content={text}
          font={{ size: '15px', weight: '900', color: 'white' }}
          contentCss={formattedTextCss}
        />
      </Column>
    </Row>
  );
};

export default Comment;
