import React from 'react';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme, css } from 'styled-components';

import Row from '../common/Row';
import Space from '../common/Space';
import Avatar from '../common/Avatar';
import Column from '../common/Column';
import FormattedText from '../common/FormattedText';

import { useFormatDistance, useS3Image } from '../../hooks';

import Icon from './Icon';

const Text = styled.span<{ white?: boolean }>`
  font-size: 18px;
  font-weight: 900;
  color: ${p => (p.white ? '#FFFFFF' : '#b1b1b1')};
`;

const DateText = styled.span`
  font-size: 14px;
  font-weight: 900;
  color: #ffffff;
  opacity: 0.6;
`;

const Post = styled.img`
  width: 50px;
  height: 50px;
`;

const mobileCss = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

interface Props {
  icon: string;
  avatar: string;
  author: string;
  action: string;
  date: string;
  post?: string;
  content: string;
  contentCss?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const ActivityItem: React.FC<Props> = ({ icon, avatar, author, action, date, post, contentCss, content }) => {
  const formattedDate = useFormatDistance(date);
  const userAvatar = useS3Image(avatar, 'thumbSmall');

  return (
    <>
      <Space height={40} />
      <Row align="flex-start" justify="space-between">
        <Row align="flex-start">
          <Column css={mobileCss}>
            <Space height={5} />
            <Icon src={icon} alt="activity" />
          </Column>
          <Space width={20} css={mobileCss} />

          <Row align="flex-start">
            <Avatar src={userAvatar} alt={author} />
            <Space width={10} />
            <Column>
              <p>
                <Text white>{author}</Text>
                {` `}
                <Text>{action}</Text>
              </p>
              <Space height={10} />

              <FormattedText content={content} contentCss={contentCss} maxWidth="500px" />
              <Space height={10} />

              <DateText>{formattedDate}</DateText>
            </Column>
          </Row>
        </Row>

        {post ? <Post src={post} alt="post" /> : <Space width={0} />}
      </Row>
    </>
  );
};

export default ActivityItem;
