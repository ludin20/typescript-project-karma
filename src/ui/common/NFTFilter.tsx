import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import logo from '../assets/karmas.png';
import arrow from '../assets/arrow.svg';

import Text from './Text';
import Row from './Row';
import Space from './Space';

const Container = styled(Row).attrs({
  align: 'center',
})<Props>`
  ${props =>
    props.bordered &&
    css`
      width: 1050px;
      padding-bottom: 10px;
      padding-top: 30px;
      position: relative;
    `}
`;

const gpk = css`
  background: #20252E;
  color: white;
  border: 1px solid #ffffff1a;
  padding: 5px 15px;
  border-radius: 90px;
  margin-right: 10px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid rgb(170,170,170);
    border-radius: 90px;
    color: white;
  }
`;

const tiger = css`
  background: #20252E;
  color: white;
  border: 1px solid #ffffff1a;
  padding: 5px 15px;
  border-radius: 90px;
  margin-right: 10px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid rgb(170,170,170);
    border-radius: 90px;
    color: white;
  }
`;

const collectionbutton = css`
  background: #20252E;
  color: white;
  border: 1px solid #ffffff1a;
  padding: 5px 15px;
  border-radius: 90px;
  margin-right: 10px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid rgb(170,170,170);
    border-radius: 90px;
    color: white;
  }
`;

const karma = css`
  background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
  color: black;
  border: 1px solid #ffffff1a;
  padding: 5px 15px;
  border-radius: 90px;
  margin-right: 10px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid rgb(170,170,170);
    border-radius: 90px;
    color: white;
  }
`;

const Toggle = styled.button<{ toogled: boolean }>`
  background: none;
  padding-left: 555px;
  img {
    width: 14px;
    transition: transform 0.2s;
    transform: ${props => props.toogled && 'rotate(-90deg)'};
  }
`;

interface Props {
  bordered?: boolean;
  size?: 'default' | 'small';
  shouldHideHeader?: boolean;
  color?: string;
}

const NFTFilter: React.FC<Props> = ({ children, bordered = true, size = 'default', shouldHideHeader, color }) => {
  const [toogled, setToogled] = useState(true);

  return (
    <Container bordered={bordered} size={size}>
      <button css={collectionbutton}>All Collections</button>
      <button css={karma}>KARMA</button>
      <button css={gpk}>GPK</button>
      <button css={tiger}>Tiger King</button>
      <Toggle onClick={() => setToogled(!toogled)} toogled={toogled}>
        <img src={arrow} alt="toogle" />
      </Toggle>
    </Container>
  );
};

export default NFTFilter;
