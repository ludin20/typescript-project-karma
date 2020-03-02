import React, { useState } from 'react';
import styled from 'styled-components';

import powerIcon from '../assets/power.svg';
import SendMoneyModal from '../wallet/SendMoneyModal/SendMoneyModal';
import SuccessModal from '../wallet/SendMoneyModal/SuccessModal';

import Button from '../common/Button';
import FollowButton from '../common/FollowButton';

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
  avatar: string;
  username: string;
  name: string;
}

const ProfileActions: React.FC<Props> = ({ me, power, handleModal, following, avatar, username, name }) => {
  const [sendMoneyModalIsOpen, setSendMoneyModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [value, setValue] = useState();
  const [to, setTo] = useState();

  const handleSubmit = (amount: number, to: string) => {
    setSendMoneyModalIsOpen(false);

    setValue(amount);
    setTo(to);

    setSuccessModalIsOpen(true);
  };

  if (me) {
    return (
      <Container>
        <ActionButton background="dark" radius="rounded" color={'#26CC8B'}>
          <img src={powerIcon} alt="power" />
          {power} Power
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
        {power} Power
      </ActionButton>

      <ActionButton background="dark" radius="rounded" color={'#26CC8B'} onClick={() => setSendMoneyModalIsOpen(true)}>
        Send Money
      </ActionButton>

      <FollowingActionButton following={following} />

      {sendMoneyModalIsOpen && (
        <SendMoneyModal
          open
          close={() => setSendMoneyModalIsOpen(false)}
          profile={{ username, avatar, name }}
          handleSubmit={handleSubmit}
        />
      )}

      {successModalIsOpen && (
        <SuccessModal open close={() => setSuccessModalIsOpen(false)} karmaValue={value} usdValue={value} to={to} />
      )}
    </Container>
  );
};

export default ProfileActions;
