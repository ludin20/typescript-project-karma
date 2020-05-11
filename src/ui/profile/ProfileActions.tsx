import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import powerIcon from '../assets/power.svg';
import SendMoneyModal from '../wallet/SendMoneyModal/SendMoneyModal';
import SuccessModal from '../wallet/SendMoneyModal/SuccessModal';

import Button from '../common/Button';
import FollowButton from '../common/FollowButton';

import { tx, logtask } from '../../services/config';
import { TOKEN_CONTRACT } from '../../common/config';
import { actionRequest, actionSuccess, actionFailure } from '../../store/ducks/action';
import { updateProfileSuccess } from '../../store/ducks/user';
import { useInt2roundKMG } from '../../hooks';

const Container = styled.div<{ me: boolean }>`
  display: flex;

  &:nth-child(3) {
    display: none;

    @media (max-width: 550px) {
      button {
        width: unset;
        font-size: 14px;
        padding: 5px 0px;
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

      @media (max-width: 1459px) {
        &:nth-child(2) {
          display: none;
        }
      }
    `}
`;

const ActionButton = styled(Button)<{ me: boolean }>`
  font-weight: 900;
  border-radius: 50px;

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
    margin-left: 20px;
  }

  ${props =>
    !props.me &&
    css`
      @media (max-width: 1460px) {
        flex: 1;
        width: unset;
        padding: 5px 20px;
        & + button {
          margin-left: 20px;
        }
      }
      @media (max-width: 550px) {
        flex: 1;
        width: unset;
        padding: 5px 16px;
        & + button {
          margin-left: 10px;
        }
      }
    `}

  ${props =>
    props.me &&
    css`
      @media (max-width: 1460px) {
        width: unset;
        padding: 5px 16px;
      }
      & + button {
        margin-left: 10px;
      }
    `}
`;

const FollowingActionButton = styled(FollowButton)`
  display: flex;
  justify-content: center;
  align-items: center;

  & + button {
    margin-left: 20px;
  }

  @media (max-width: 1460px) {
    flex: 1;
  }
`;

interface Props {
  me?: boolean;
  wax: number;
  eos: number;
  currentPower: number;
  liquidBalance: number;
  handleModal?: () => void;
  onFollowSuccess?: (boolean) => void;
  following?: boolean;
  avatar: string;
  author?: string;
  username: string;
  name: string;
  mobile?: boolean;
}

const ProfileActions: React.FC<Props> = ({
  me,
  wax,
  eos,
  currentPower,
  liquidBalance,
  handleModal,
  onFollowSuccess,
  following,
  avatar,
  username,
  name,
  mobile,
  author,
}) => {
  const dispatch = useDispatch();
  const [sendMoneyModalIsOpen, setSendMoneyModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [value, setValue] = useState({ karma: 0, usd: 0 });
  const [to, setTo] = useState('');

  const handleSubmit = async (amount: number, to: string, memo: string) => {
    try {
      dispatch(actionRequest());
      const result = await tx(
        'transfer',
        {
          to: to,
          quantity: `${Number(amount).toFixed(4)} KARMA`,
          memo: memo.trim(),
        },
        'from',
        TOKEN_CONTRACT,
      );

      if (result) {
        logtask(null, '{"action":"transfer"}');
        setValue({ karma: amount, usd: wax * eos * amount });
        setTo(to);
        const walledData = {
          liquidBalance: liquidBalance - amount,
        };
        dispatch(updateProfileSuccess(walledData));
        dispatch(actionSuccess());
        setSendMoneyModalIsOpen(false);
        setSuccessModalIsOpen(true);
      } else {
        // eslint-disable-next-line no-console
        console.log('transfer error');
        dispatch(actionFailure());
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error: ', e);
      dispatch(actionFailure());
    }
  };

  if (me) {
    return (
      <Container me={me}>
        <ActionButton me border background="dark" radius="rounded" color={'#26CC8B'} borderColor={'#26CC8B'}>
          <img src={powerIcon} alt="power" />
          {useInt2roundKMG(currentPower)}
        </ActionButton>

        <ActionButton me border radius="rounded" onClick={handleModal}>
          Edit Profile
        </ActionButton>
      </Container>
    );
  }

  return (
    <Container me={me}>
      <ActionButton me={false} border background="dark" radius="rounded" color={'#26CC8B'} borderColor={'#26CC8B'}>
        <img src={powerIcon} alt="power" />
        {useInt2roundKMG(currentPower)}
      </ActionButton>

      <ActionButton
        me={false}
        border
        background="dark"
        radius="rounded"
        color={'#26CC8B'}
        borderColor={'#26CC8B'}
        onClick={() => setSendMoneyModalIsOpen(true)}
      >
        {mobile ? 'Send Money' : 'Send Money'}
      </ActionButton>

      <FollowingActionButton
        author={author}
        following={following}
        onSuccess={(author, follow) => onFollowSuccess(follow)}
      />

      {sendMoneyModalIsOpen && (
        <SendMoneyModal
          open
          close={() => setSendMoneyModalIsOpen(false)}
          profile={{ author, username, avatar, name }}
          handleSubmit={handleSubmit}
          wax={wax}
          eos={eos}
          liquidBalance={liquidBalance}
        />
      )}

      {successModalIsOpen && (
        <SuccessModal open close={() => setSuccessModalIsOpen(false)} value={value} to={to} action="send" />
      )}
    </Container>
  );
};

export default ProfileActions;
