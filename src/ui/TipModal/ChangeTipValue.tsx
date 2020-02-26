import React, { useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  margin: 20px 0 30px;
  text-align: center;

  section {
    margin: 10px 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      color: rgba(255, 255, 255, 0.6);
      font-size: 60px;
      font-weight: 900;
    }

    button {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      font-size: 40px;
      font-weight: bold;
      border-radius: 50%;
      box-shadow: 0px 3px 20px #00000081;

      display: flex;
      justify-content: center;
      align-items: center;
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
    <Container>
      <span>KARMA</span>

      <section>
        <button onClick={() => changeTipValue(tipValue - 1)}>-</button>
        <strong>{tipValue}</strong>
        <button onClick={() => changeTipValue(tipValue + 1)}>+</button>
      </section>

      <span>{tipValue}.00 USD</span>
    </Container>
  );
};

export default ChangeTipValue;
