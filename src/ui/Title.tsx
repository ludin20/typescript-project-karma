import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import arrow from './assets/arrow.svg';

const Container = styled.div<{ toogled: boolean; size: 'default' | 'small'; bordered: boolean }>`
  display: flex;
  align-items: center;

  strong {
    text-align: left;
    font-size: ${props => (props.size === 'default' ? '44px' : '35px')};
    font-weight: 900;
    color: #fff;
  }

  button {
    background: none;
    margin-left: 20px;

    img {
      width: 20px;
      transition: transform 0.2s;
      transform: ${props => props.toogled && 'rotate(-90deg)'};
    }
  }

  ${props =>
    props.bordered &&
    css`
      padding-bottom: 10px;
      position: relative;

      &::after {
        content: '';
        width: 60px;
        height: 7px;
        background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
        border-radius: 5px;

        position: absolute;
        bottom: 0;
      }
    `}
`;

interface Props {
  children: React.ReactChild;
  withDropDown?: boolean;
  bordered?: boolean;
  size?: 'default' | 'small';
}

const Title: React.FC<Props> = ({ children, withDropDown, bordered = true, size = 'default' }) => {
  const [toogled, setToogled] = useState(false);

  return (
    <Container toogled={toogled} bordered={bordered} size={size}>
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
