import React from 'react';
import styled, { css } from 'styled-components';

import Button from './Button';

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
  following?: boolean;
  shouldHideFollowOnMobile?: boolean;
}

const FollowButton: React.FC<Props> = ({ following, ...props }) => {
  return (
    <Container
      {...props}
      border
      borderColor={following ? '#26CC8B' : '#fff'}
      radius="rounded"
      color={following ? '#26CC8B' : undefined}
    >
      {!following ? 'Follow' : 'Following'}
    </Container>
  );
};

export default FollowButton;
