import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useField, useFormikContext } from 'formik';

import { WalletProps } from '../Actions';

import upAndDown from '../../assets/up-and-down.svg';

const Container = styled.div<{ empty: boolean }>`
  width: 40%;
  margin: 20px 0 30px;
  text-align: center;

  span {
    font-size: 18px;
    font-weight: 900;
    color: #fff;
  }

  section {
    margin: 10px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      max-width: 160px;
      background: none;
      color: #fff;
      text-align: center;
      font-size: 60px;
      font-weight: 900;
      border: none;
      transition: color 0.2s;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.6);
      }
    }

    button {
      width: 55px !important;
      height: 55px !important;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      border-radius: 50%;
      box-shadow: 0px 3px 10px #00000081;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: 800px) {
    width: unset !important;

    section > input {
      margin: 0 10px;
    }
  }

  @media (max-width: 400px) {
    width: 100% !important;
  }
`;

const ChangeValue: React.FC<WalletProps> = ({ usdPrice, eosPrice, balanceAmount, ...props }) => {
  const usdBalanceAmount = usdPrice * eosPrice * balanceAmount;
  const [currency, setCurrency] = useState<'KARMA' | 'USD'>('KARMA');
  const [karmaAmount, setKarmaAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);

  const [field] = useField('value');
  const { setFieldValue } = useFormikContext<any>();

  const handleChangeValue = useCallback(
    (value: string) => {
      const amount = Number(value);
      if (currency == 'KARMA') {
        if (amount < 0 || amount > balanceAmount) return;

        if (value.includes('0') && !value.includes('.')) setKarmaAmount('');
        setTimeout(() => {
          setKarmaAmount(amount);
        }, 1);
        setUsdAmount(parseFloat((usdPrice * eosPrice * amount).toFixed(2)));
        setFieldValue('value', amount);
      } else {
        if (amount < 0 || amount > usdBalanceAmount) return;

        if (value.includes('0') && !value.includes('.')) setUsdAmount('');
        setTimeout(() => {
          setUsdAmount(amount);
        }, 1);
        setKarmaAmount(parseFloat((amount / (usdPrice * eosPrice)).toFixed()));
        setFieldValue('value', parseFloat((amount / (usdPrice * eosPrice)).toFixed()));
      }
    },
    [balanceAmount, currency, eosPrice, setFieldValue, usdBalanceAmount, usdPrice],
  );

  const handleChangeCurrency = useCallback(() => {
    if (currency === 'KARMA') {
      setCurrency('USD');
    } else {
      setCurrency('KARMA');
    }
  }, [currency]);

  return (
    <Container empty={!!field.value}>
      <span>{currency}</span>

      <section>
        <button onClick={() => handleChangeValue(balanceAmount && currency === 'KARMA' ? balanceAmount.toFixed() : usdBalanceAmount.toFixed(2))}>MAX</button>
        <input
          type="number"
          placeholder="0"
          value={currency === 'KARMA' ? karmaAmount : usdAmount}
          onChange={e => handleChangeValue(e.target.value)}
          max={currency === 'KARMA' ? balanceAmount : usdBalanceAmount}
        />
        <button onClick={handleChangeCurrency}>
          <img src={upAndDown} alt="up and down" />
        </button>
      </section>

      <span>{currency === 'KARMA' ? usdAmount.toFixed(2) + ' USD' : karmaAmount.toFixed() + ' KARMA'}</span>
    </Container>
  );
};

export default ChangeValue;
