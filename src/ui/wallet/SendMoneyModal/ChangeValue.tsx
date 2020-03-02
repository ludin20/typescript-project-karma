import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useField, useFormikContext } from 'formik';

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
      width: 55px;
      height: 55px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      border-radius: 50%;
      box-shadow: 0px 3px 20px #00000081;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ChangeValue: React.FC = () => {
  const [currency, setCurrency] = useState<'KARMA' | 'USD'>('KARMA');

  const [field] = useField('value');
  const { setFieldValue } = useFormikContext<any>();

  const handleChangeValue = useCallback(
    (amount: number) => {
      if (amount < 0 || amount > 1000) return;

      if (amount === 0) {
        setFieldValue('value', 0);
        return;
      }

      setFieldValue('value', amount);
    },
    [setFieldValue],
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
        <button onClick={() => handleChangeValue(1000)}>MAX</button>
        <input
          type="number"
          placeholder="0"
          value={field.value}
          onChange={e => handleChangeValue(Number(e.target.value))}
          max={1000}
        />
        <button onClick={handleChangeCurrency}>
          <img src={upAndDown} alt="up and down" />
        </button>
      </section>

      <span>
        {field.value ? field.value.toFixed() : '0.00'} {currency === 'KARMA' ? 'USD' : 'KARMA'}
      </span>
    </Container>
  );
};

export default ChangeValue;
