import React, { useCallback } from 'react';
import styled from 'styled-components';

import minus from '../../assets/minus.svg';
import plus from '../../assets/plus-icon.svg';

const Container = styled.div<{ empty: boolean }>`
  width: 100%;
  margin: 20px 0 30px;
  text-align: center;

  section {
    margin: 10px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
      width: 100%;
      margin-top: -10px;
      background: none;
      border: none;
      color: ${props => (!props.empty ? 'rgba(255, 255, 255, 0.6)' : '#fff')};
      font-size: 50px;
      font-weight: 900;
      transition: color 0.2s;
      text-align: center;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    button {
      background: none;

      img {
        width: 110px;
        height: 110px;
      }
    }
  }

  @media (max-width: 550px) {
    section > button > img {
      width: 72px;
      height: 72px;
    }
  }
`;

interface Props {
  value: number;
  onChange(value: number): void;
  method: string;
  wax?: number;
  eos?: number;
  liquidBalance?: number;
}

const ChangeValue: React.FC<Props> = ({ value, method, onChange, wax, eos, liquidBalance }) => {
  const handleChange = useCallback(
    (karmas: number) => {
      if (karmas < 1 || karmas > liquidBalance) return;

      onChange(karmas);
    },
    [onChange],
  );

  return (
    <Container empty={!!value}>
      <span>{method}</span>

      <section>
        <button onClick={() => handleChange(value - 1)}>
          <img src={minus} alt="minus" />
        </button>
        <input
          type="number"
          placeholder={0}
          value={value > 0 ? value : ''}
          onChange={e => handleChange(parseInt(e.target.value))}
          min={1}
          max={liquidBalance}
        />
        <button onClick={() => handleChange(value + 1)}>
          <img src={plus} alt="plus" />
        </button>
      </section>

      <span>{value ? (value * wax * eos).toFixed(2) : 0} USD</span>
    </Container>
  );
};

export default ChangeValue;
