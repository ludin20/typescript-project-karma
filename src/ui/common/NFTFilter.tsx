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
  background: none;
  width: 80px;
  color: white;
  border: 1px solid #26CC8B;
  padding: 10px 20px;
  border-radius: 90px;
  margin-right: 15px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid #26CC8B;
    padding: 10px 20px;
    border-radius: 90px;
    color: white;
  }
`;

const tiger = css`
  background: none;
  width: 125px;
  color: white;
  border: 1px solid #26CC8B;
  padding: 10px 20px;
  border-radius: 90px;
  margin-right: 15px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid #26CC8B;
    padding: 10px 20px;
    border-radius: 90px;
    color: white;
  }
`;

const collectionbutton = css`
  background: none;
  width: 145px;
  color: white;
  border: 1px solid #26CC8B;
  padding: 10px 20px;
  border-radius: 90px;
  margin-right: 15px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid #26CC8B;
    padding: 10px 20px;
    border-radius: 90px;
    color: white;
  }
`;

const karma = css`
  width: 125px;
  border: 1px solid #26CC8B;
  border-radius: 90px;
  color: #191A19;
  padding: 10px 20px;
  margin-right: 15px;
  background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
  text-align: left;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid #26CC8B;
    border-radius: 90px;
    color: white;
  }
  span {
    position: absolute;
    padding-left: 10px;
  }
`;

const iconbutton = css`
  border: 1px solid #26CC8B;
  background: #191A19;
  border-radius: 100px;
  width: 20px;
  line-height: 22px;
  height: 20px;
`;

const icon = css`
  width: 14px;
`;

const Toggle = styled.button<{ toogled: boolean }>`
  background: none;
  padding-left: 500px;
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
      <button css={karma}><button css={iconbutton}><img css={icon} src={logo} alt="logo"/><span>KARMA</span></button></button>
      <button css={gpk}>GPK</button>
      <button css={tiger}>Tiger King</button>
      <Toggle onClick={() => setToogled(!toogled)} toogled={toogled}>
        <img src={arrow} alt="toogle" />
      </Toggle>
    </Container>
  );
};

export default NFTFilter;
