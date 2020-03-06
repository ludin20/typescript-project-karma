import React from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  width: 100%;
  margin: 20px 0 30px;

  display: flex;

  li {
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    padding: 10px 15px;
    font-size: 15px;
    font-weight: 900;
    border-radius: 5px;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    & + li {
      margin-left: 10px;
    }
  }
`;

interface Props {
  onChange(value: number): void;
}

const ValueCards: React.FC<Props> = ({ onChange }) => {
  return (
    <Container>
      <li onClick={() => onChange(10)}>10</li>
      <li onClick={() => onChange(100)}>100</li>
      <li onClick={() => onChange(250)}>250</li>
      <li onClick={() => onChange(1000)}>1000</li>
    </Container>
  );
};

export default ValueCards;
