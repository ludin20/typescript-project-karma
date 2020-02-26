import React, { useCallback } from 'react';
import styled from 'styled-components';

import minus from '../assets/minus.svg';
import plus from '../assets/plus-icon.svg';

const Container = styled.div<{ empty: boolean }>`
  width: 100%;
  margin: 20px 0 30px;
  text-align: center;

  section {
    margin: 10px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: ${props => (!props.empty ? 'rgba(255, 255, 255, 0.6)' : '#fff')};
      font-size: 60px;
      font-weight: 900;
      transition: color 0.2s;
    }

    button {
      background: none;

      img {
        width: 110px;
        height: 110px;
      }
    }
  }
`;

interface Props {
  tipValue: number;
  changeValue(value: number): void;
}

const ChangeTipValue: React.FC<Props> = ({ tipValue, changeValue }) => {
  const changeTipValue = useCallback(
    (value: number) => {
      if (value < 0 || value > 1000) return;

      changeValue(value);
    },
    [changeValue],
  );

  return (
    <Container empty={!!tipValue}>
      <span>KARMA</span>

      <section>
        <button onClick={() => changeTipValue(tipValue - 1)}>
          <img src={minus} alt="minus" />
        </button>
        <strong>{tipValue}</strong>
        <button onClick={() => changeTipValue(tipValue + 1)}>
          <img src={plus} alt="plus" />
        </button>
      </section>

      <span>{tipValue}.00 USD</span>
    </Container>
  );
};

export default ChangeTipValue;
