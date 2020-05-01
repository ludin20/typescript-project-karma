import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { tx, logtask } from '../../services/config';
import { TOKEN_CONTRACT } from '../../common/config';
import { actionRequest, actionSuccess, actionFailure } from '../../store/ducks/action';

import karma from '../assets/logo.png';
import wax from '../assets/wax.png';

import SendMoneyModal from './SendMoneyModal/SendMoneyModal';
import SuccessModal from './SendMoneyModal/SuccessModal';
import MyPowerModal from './MyPowerModal/MyPower';

import Button from './WalletButton';
import Token from './Token';

const Container = styled.div`
  width: 100%;
  background: ${props => props.theme.dark};
  padding: 40px 25px;
  border-radius: 40px 40px 20px 20px;

  header {
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;
  }

  > strong {
    color: #fff;
    font-size: 32px;
    font-weight: 900;
  }

  @media (max-width: 550px) {
    > strong {
      font-size: 26px;
    }
  }
`;

export interface WalletProps {
  usdPrice: number;
  eosPrice: number;
  stakedAmount?: number;
  balanceAmount?: number;
  waxAmount?: number;
  onRefresh?: any;
}

const WalletActions: React.FC<WalletProps> = ({ usdPrice, eosPrice, stakedAmount, balanceAmount, waxAmount, onRefresh }) => {
  const dispatch = useDispatch();
  const [sendMoneyModalIsOpen, setSendMoneyModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [powerModalIsOpen, setPowerModalIsOpen] = useState(false);
  const [action, setAction] = useState('');
  const [value, setValue] = useState({ karma: 0, usd: 0 });
  const [to, setTo] = useState('');
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    const claimedDay = localStorage.getItem('claimedDate');
    const dayNow = new Date().getUTCDate().toString();
    if (claimedDay !== dayNow) setClaimed(false);
  }, []);

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
        setValue({ karma: amount, usd: usdPrice * eosPrice * amount });
        setTo(to);
        setAction('send');
        onRefresh().then(() => {
          setSendMoneyModalIsOpen(false);
          setSuccessModalIsOpen(true);
        });
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

  const claim = async () => {
    try {
      dispatch(actionRequest());
      const result = await tx("claim", {}, "author", "thekarmadapp");
      let reward = 0;
      if (result) {
        try {
          const traces = result.processed.action_traces[0].inline_traces;

          if (!traces) {
            reward = 0;
          } else {
            const data = traces;
            data.forEach(item => {
              if (item.inline_traces){
                const innerItem = item.inline_traces[0];
                if (innerItem && innerItem.act && innerItem.act.data && innerItem.act.data.quantity) {
                  reward += parseFloat(innerItem.act.data.quantity);
                }
              }
            });
          }

          setClaimed(true);
          setAction('claim');
          setTo(result.transaction_id);
          setValue({ karma: reward, usd: usdPrice * eosPrice * reward });
          onRefresh().then(() => setSuccessModalIsOpen(true));
          const dayNow = new Date().getUTCDate();
          localStorage.setItem('claimedDate', dayNow.toString());
        } catch (error) {
          console.log('error: ', error);
          dispatch(actionFailure());
        }
      }
    } catch (e) {
      console.log('error while claiming: ', e);
      dispatch(actionFailure());
    }
  };

  return (
    <Container>
      <header>
        <Button actionType="Send" onClick={() => setSendMoneyModalIsOpen(true)} />
        <Button
          actionType="Power"
          onClick={() => {
            setAction('up');
            setPowerModalIsOpen(true);
          }}
        />
        <Button
          actionType="Cool"
          onClick={() => {
            setAction('down');
            setPowerModalIsOpen(true);
          }}
        />
        <Button actionType="Claim" onClick={claim} />
      </header>

      <strong>Tokens</strong>
      <Token
        icon={karma}
        name="KARMA"
        unitValue={(usdPrice * eosPrice).toFixed(5)}
        totalValue={(usdPrice * eosPrice * balanceAmount).toFixed(2)}
        value={balanceAmount ? balanceAmount.toFixed() : 0}
      />
      <Token
        icon={wax}
        name="WAX"
        unitValue={usdPrice.toFixed(5)}
        totalValue={(usdPrice * waxAmount).toFixed(2)}
        value={waxAmount ? waxAmount.toFixed() : 0}
      />

      {sendMoneyModalIsOpen && (
        <SendMoneyModal
          open
          close={() => setSendMoneyModalIsOpen(false)}
          handleSubmit={handleSubmit}
          usdPrice={usdPrice}
          eosPrice={eosPrice}
          balanceAmount={balanceAmount}
        />
      )}

      {successModalIsOpen && (
        <SuccessModal open close={() => setSuccessModalIsOpen(false)} value={value} to={to} action={action} />
      )}

      {powerModalIsOpen && (
        <MyPowerModal
          open
          stakedAmount={stakedAmount}
          balanceAmount={balanceAmount}
          action={action}
          close={() => setPowerModalIsOpen(false)}
          onChangeAction={setAction}
          onRefresh={onRefresh}
        />
      )}
    </Container>
  );
};

export default WalletActions;
