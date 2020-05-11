import React from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import { useS3Image, useFormatDistance } from '../../hooks';
import Row from '../common/Row';
import Avatar from '../common/Avatar';
import Space from '../common/Space';
import Column from '../common/Column';
import Text from '../common/Text';
import FormattedText from '../common/FormattedText';

const Clickable = styled.div`
  cursor: pointer;
`;

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
  username: string;
  author_profilehash: string;
  created_at: string;
  text: string;
}

const Comment: React.FC<Props> = ({ author_profilehash, author, username, created_at, text }) => {
  const router = useRouter();
  const avatar = useS3Image(author_profilehash, 'thumbSmall');
  const formattedDate = useFormatDistance(created_at);

  return (
    <Row align="center">
      <Clickable
        onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
      >
        <Avatar css={avatarCss} src={avatar} alt={author} size="small" />
      </Clickable>
      <Space width={15} style={{ minWidth: 15 }} />

      <Column>
        <Row>
          <Clickable
            onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
          >
            <Text size={16} weight="900" color="white">
              {username}
            </Text>
          </Clickable>
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
