import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Container = styled(Button)`
  font-size: 16px;
  font-weight: 900;
  padding-top: 8px;

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
  following: boolean;
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
