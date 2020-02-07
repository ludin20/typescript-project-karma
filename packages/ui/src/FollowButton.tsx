import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const Container = styled(Button)`
  font-size: 14px;
`;

interface Props {
  following: boolean;
}

const FollowButton: React.FC<Props> = ({ following }) => {
  return (
    <Container
      background={following ? 'lightGreen' : undefined}
      border={!following}
      radius="rounded"
      color={following ? '#26CC8B' : undefined}
    >
      {!following ? 'Follow' : 'Following'}
    </Container>
  );
};

export default FollowButton;
