import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import powerIcon from '../assets/power.svg';
import SendMoneyModal from '../wallet/SendMoneyModal/SendMoneyModal';
import SuccessModal from '../wallet/SendMoneyModal/SuccessModal';

import Button from '../common/Button';
import FollowButton from '../common/FollowButton';

const Container = styled.div<{ me: boolean }>`
  display: flex;

  &:nth-child(3) {
    display: none;

    @media (max-width: 550px) {
      button {
        width: unset;
        font-size: 14px;
        padding: 8px 20px;
      }
    }
  }

  ${props =>
    !props.me &&
    css`
      &:nth-child(3) {
        display: flex;
        justify-content: space-around;
        margin-top: 14px;
      }

      @media (max-width: 1366px) {
        &:nth-child(2) {
          display: none;
        }
      }

      @media (min-width: 1367px) {
        &:nth-child(3) {
          display: none;
        }
      }
    `}
`;

const ActionButton = styled(Button)<{ me: boolean }>`
  width: 140px;
  font-weight: 900;
  border-radius: 50px;
  border: 2px solid #26cc8b;

  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 18px;
    margin-right: 8px;
  }

  & + button {
    background: #20252e;
    border: 2px solid #ffffff;
    margin-left: 20px;
  }

  ${props =>
    !props.me &&
    css`
      @media (max-width: 1366px) {
        flex: 1;
        width: unset;
        padding: 5px 16px;
      }
    `}

  ${props =>
    props.me &&
    css`
      @media (max-width: 550px) {
        width: unset;
        padding: 5px 16px;
      }
    `}
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

  @media (max-width: 1366px) {
    flex: 1;
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
  mobile?: boolean;
}

const ProfileActions: React.FC<Props> = ({ me, power, handleModal, following, avatar, username, name, mobile }) => {
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
      <Container me={me}>
        <ActionButton me background="dark" radius="rounded" color={'#26CC8B'}>
          <img src={powerIcon} alt="power" />
          {power} Power
        </ActionButton>

        <ActionButton me border radius="rounded" onClick={handleModal}>
          Edit Profile
        </ActionButton>
      </Container>
    );
  }

  return (
    <Container me={me}>
      <ActionButton me={false} background="dark" radius="rounded" color={'#26CC8B'}>
        <img src={powerIcon} alt="power" />
        {mobile ? power : `${power} Power`}
      </ActionButton>

      <ActionButton
        me={false}
        background="dark"
        radius="rounded"
        color={'#26CC8B'}
        onClick={() => setSendMoneyModalIsOpen(true)}
      >
        {mobile ? 'Send' : 'Send Money'}
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
