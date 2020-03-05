import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import arrow from '../assets/arrow.svg';

const Container = styled.div<Props>`
  display: flex;
  align-items: center;

  strong {
    font-size: ${props => (props.size === 'default' ? '34px' : '30px')};
    font-weight: 900;
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
        background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
        border-radius: 5px;

        position: absolute;
        bottom: 0;
      }
    `}

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        display: none;
      }
    `}
`;

interface Props {
  toogled?: boolean;
  withDropDown?: boolean;
  bordered?: boolean;
  size?: 'default' | 'small';
  shouldHideHeader?: boolean;
}

const Title: React.FC<Props> = ({ children, withDropDown, bordered = true, size = 'default', shouldHideHeader }) => {
  const [toogled, setToogled] = useState(false);

  return (
    <Container toogled={toogled} bordered={bordered} size={size} shouldHideHeader={shouldHideHeader}>
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
