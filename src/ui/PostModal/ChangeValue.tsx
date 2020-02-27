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
  value: number;
  onChange(value: number): void;
  method: string;
}

const ChangeValue: React.FC<Props> = ({ value, method, onChange }) => {
  const handleChange = useCallback(
    (karmas: number) => {
      if (karmas < 0 || karmas > 1000) return;

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
        <strong>{value}</strong>
        <button onClick={() => handleChange(value + 1)}>
          <img src={plus} alt="plus" />
        </button>
      </section>

      <span>{value}.00 USD</span>
    </Container>
  );
};

export default ChangeValue;
