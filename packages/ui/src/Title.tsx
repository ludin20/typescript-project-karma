import React, { useState } from 'react';
import styled from 'styled-components';

import arrow from '../assets/arrow.svg';

const Container = styled.div<{ toogled: boolean }>`
  padding-bottom: 10px;
  position: relative;

  &::after {
    content: '';
    width: 50px;
    height: 4px;
    background: ${props => props.theme.green};
    border-radius: 5px;

    position: absolute;
    bottom: 0;
  }

  display: flex;
  align-items: center;

  strong {
    font-size: 30px;
    color: #fff;
  }
  button {
    background: none;
    margin-left: 10px;

    img {
      width: 14px;
      transition: transform 0.2s;
      transform: ${props => props.toogled && 'rotate(-90deg)'};
    }
  }
`;

interface Props {
  children: React.ReactChild;
  withDropDown?: boolean;
}

const Title: React.FC<Props> = ({ children, withDropDown }) => {
  const [toogled, setToogled] = useState(false);

  return (
    <Container toogled={toogled}>
      <strong>{children}</strong>
      {withDropDown && (
        <button onClick={() => setToogled(!toogled)}>
          <img src={arrow} alt="toogle" />
        </button>
      )}
    </Container>
  );
};

export default Title;
