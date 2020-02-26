import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

import powerIcon from '../assets/power.svg';
import FollowButton from '../FollowButton';

const Container = styled.div`
  display: flex;
`;

const ActionButton = styled(Button)`
  font-size: 16px;
  font-weight: 900;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 18px;
    margin-right: 8px;
  }

  /* &:first-child {
    box-shadow: 0px 3px 50px #00000034;
  } */

  & + button {
    margin-left: 20px;
  }
`;

const FollowingActionButton = styled(FollowButton)`
  font-size: 16px;
  font-weight: 900;

  display: flex;
  justify-content: center;
  align-items: center;

  & + button {
    margin-left: 20px;
  }
`;

interface Props {
  me?: boolean;
  power: string | number;
  handleModal?: () => void;
  following?: boolean;
}

const ProfileActions: React.FC<Props> = ({ me, power, handleModal, following }) => {
  if (me) {
    return (
      <Container>
        <ActionButton background="dark" radius="rounded" color={'#26CC8B'}>
          <img src={powerIcon} alt="power" />
          {power}
        </ActionButton>

        <ActionButton border radius="rounded" onClick={handleModal}>
          Edit Profile
        </ActionButton>
      </Container>
    );
  }

  return (
    <Container>
      <ActionButton background="dark" radius="rounded" color={'#26CC8B'}>
        <img src={powerIcon} alt="power" />
        {power}
      </ActionButton>

      <ActionButton background="dark" radius="rounded" color={'#26CC8B'}>
        Send Money
      </ActionButton>

      <FollowingActionButton following={following} />
    </Container>
  );
};

export default ProfileActions;
