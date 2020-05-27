import React from 'react';
import { useRouter } from 'next/router';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme, css } from 'styled-components';

import Row from '../common/Row';
import Space from '../common/Space';
import Avatar from '../common/Avatar';
import Column from '../common/Column';
import FormattedText from '../common/FormattedText';

import { useFormatDistance, useS3Image } from '../../hooks';

import ShimmerImage from '../common/ShimmerImage';

import Icon from './Icon';

const Text = styled.span<{ white?: boolean; clickable?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  color: ${p => (p.white ? '#FFFFFF' : '#b1b1b1')};
  ${p =>
    p.clickable &&
    css`
      cursor: pointer;
    `}
`;

const DateText = styled.span`
  font-size: 14px;
  font-weight: 200;
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

const clickableCss = css`
  cursor: pointer;
`;

interface Props {
  icon: string;
  avatar: string;
  author: string;
  displayname: string;
  action: string;
  date: string;
  post?: string;
  content?: string;
  contentCss?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const ActivityItem: React.FC<Props> = ({
  icon,
  avatar,
  author,
  displayname,
  action,
  date,
  post,
  contentCss,
  content,
}) => {
  const router = useRouter();
  const formattedDate = useFormatDistance(date);
  const userAvatar = useS3Image(avatar, 'thumbSmall');
  const postImage = useS3Image(post, 'thumbSmall');

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
            <ShimmerImage
              avatar
              size="small"
              src={userAvatar}
              alt={displayname}
              css={clickableCss}
              onClick={() => router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })}
            />
            <Space width={10} />
            <Column>
              <p>
                <Text
                  white
                  clickable
                  onClick={() =>
                    router.push('/profile/[username]/[tab]', `/profile/${author}/media`, { shallow: true })
                  }
                >
                  {displayname}
                </Text>
                {` `}
                <Text>{action}</Text>
              </p>
              <Space height={10} />

              {content && (
                <div>
                  <FormattedText content={content} contentCss={contentCss} maxWidth="500px" />
                  <Space height={10} />{' '}
                </div>
              )}

              <DateText>{formattedDate}</DateText>
            </Column>
          </Row>
        </Row>

        {post ? <Post src={postImage} alt="post" /> : <Space width={0} />}
      </Row>
    </>
  );
};

export default ActivityItem;
