import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

import Button from './Button';
import { KARMA_AUTHOR, REQUEST_JWT } from '../../common/config';
import { follow } from '../../services/config';

const Container = styled(Button)<Props>`
  font-size: 16px;
  font-weight: 900;
  padding-top: 8px;

  &:hover {
    opacity: 0.8;
  }

  ${props =>
    props.shouldHideFollowOnMobile &&
    css`
      @media (max-width: 550px) {
        display: none;
      }
    `}
`;

interface Props {
  author?: string;
  following?: boolean;
  onSuccess?: (boolean) => void;
  shouldHideFollowOnMobile?: boolean;
}

const FollowButton: React.FC<Props> = ({ author, following, onSuccess, ...props }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [accountName, setAccountName] = useState('');

  const handleFollow = (accountName, following) => {
    follow(accountName, following)
      .then(res => {
        setIsFollowing(!isFollowing);
        onSuccess && onSuccess(!isFollowing);
      })
      .catch(err => {
        console.log('following action error', err); // eslint-disable-line no-console
      });
  };

  useEffect(() => {
    setAccountName(author);
    setIsFollowing(following);
  }, [author, following]);

  const handleAction = () => {
    if (accountName) handleFollow(accountName, !isFollowing);
  };

  return (
    <Container
      {...props}
      border
      borderColor={isFollowing ? '#26CC8B' : '#fff'}
      radius="rounded"
      color={isFollowing ? '#26CC8B' : '#fff'}
      onClick={() => handleAction()}
    >
      {!isFollowing ? 'Follow' : 'Following'}
    </Container>
  );
};

export default FollowButton;
