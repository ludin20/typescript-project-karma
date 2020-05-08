import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { css } from 'styled-components';

import { useS3Image } from '../../hooks';

import Avatar from './Avatar';
import FollowButton from './FollowButton';
import Space from './Space';
import Row from './Row';
import Col from './Column';
import Text from './Text';

const sectionCss = css`
  cursor: pointer;
`;

interface Props {
  author: string;
  username?: string;
  hash?: string;
  displayname?: string;
  isFollowing?: boolean;
  onBlur(): void;
  onFollow?(author: string, follow: boolean): void;
}

const FollowCard: React.FC<Props> = ({ author, username, hash, displayname, isFollowing, onFollow, onBlur }) => {
  const router = useRouter();
  const avatar = useS3Image(hash, 'thumbSmall');

  const handleClick = useCallback(() => {
    const href = '/profile/[username]/[tab]';
    const as = `/profile/${author}/media`;
    router.push(href, as, { shallow: false });
    onBlur();
  }, [router, author, onBlur]);

  return (
    <>
      <Space height={30} />
      <Row align="center" justify="space-between" style={{ width: '100%' }}>
        <Row css={sectionCss} align="center" onClick={handleClick}>
          <Avatar src={avatar} alt={name} size="small" />
          <Space width={10} />
          <Col align="flex-start">
            <div>
              <Text size={16} weight="900">
                {displayname}
              </Text>
              <Space height={2} />

              <Text size={16} color="midGray">
                {'@' + username}
              </Text>
            </div>
          </Col>
        </Row>

        <FollowButton author={author} following={isFollowing} onSuccess={onFollow} />
      </Row>
    </>
  );
};

export default FollowCard;
