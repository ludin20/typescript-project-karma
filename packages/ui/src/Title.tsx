import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import arrow from '../assets/arrow.svg';

const Container = styled.div<{ toogled: boolean; size: 'default' | 'small'; bordered: boolean }>`
  display: flex;
  align-items: center;

  strong {
    font-size: ${props => (props.size === 'default' ? '30px' : '25px')};
    font-weight: 600;
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

  ${props =>
    props.bordered &&
    css`
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
