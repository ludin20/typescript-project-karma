import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useS3Image } from '../../hooks';

import Avatar from './Avatar';
import FollowButton from './FollowButton';
import Space from './Space';
import Row from './Row';
import Col from './Column';
import Text from './Text';

const Section = styled.div`
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
        <Row align="center">
          <Avatar src={avatar} alt={name} size="small" />
          <Space width={10} />
          <Col align="flex-start" onClick={handleClick}>
            <Section>
              <Text size={16} weight="900">
                {displayname}
              </Text>
              <Space height={2} />

              <Text size={16} color="midGray">
                {'@' + username}
              </Text>
            </Section>
          </Col>
        </Row>

        <FollowButton author={author} following={isFollowing} onSuccess={onFollow} />
      </Row>
    </>
  );
};

export default FollowCard;
