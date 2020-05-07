import React from 'react';

import { useS3Image } from '../../hooks';

import Avatar from './Avatar';
import FollowButton from './FollowButton';
import Space from './Space';
import Row from './Row';
import Col from './Column';
import Text from './Text';

interface Props {
  author: string;
  username?: string;
  hash?: string;
  displayname?: string;
  isFollowing?: boolean;
  onFollow?(author: string, follow: boolean): void;
}

const FollowCard: React.FC<Props> = ({ author, username, hash, displayname, isFollowing, onFollow }) => {
  const avatar = useS3Image(hash, 'thumbSmall');

  return (
    <>
      <Space height={30} />
      <Row align="center" justify="space-between" style={{ width: '100%' }}>
        <Row align="center">
          <Avatar src={avatar} alt={name} size="small" />
          <Space width={10} />
          <Col align="flex-start">
            <Text size={16} weight="900">
              {displayname}
            </Text>
            <Space height={2} />

            <Text size={16} color="midGray">
              {'@' + username}
            </Text>
          </Col>
        </Row>

        <FollowButton author={author} following={isFollowing} onSuccess={onFollow} />
      </Row>
    </>
  );
};

export default FollowCard;
