import React, { useState } from 'react';
import styled, { css } from 'styled-components';

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
      padding-bottom: 10px;
      position: relative;

      &::after {
        content: '';
        width: 60px;
        height: 6px;
        background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
        border-radius: 5px;

        position: absolute;
        bottom: 0;
      }
    `}
`;

const asset = css`
  background: none;
  width: 125px;
  color: rgb(170, 170, 170);
  position: absolute;
  margin-left: 570px;
  &:hover {
    opacity: 0.8;
    border: 1px solid #26CC8B;
    padding: 10px 20px;
    border-radius: 90px;
    color: white;
  }
  &:focus {
    border: 1px solid #26CC8B;
    padding: 10px 20px;
    border-radius: 90px;
    color: white;
  }
`;

const listing = css`
  background: none;
  width: 170px;
  color: rgb(170, 170, 170);
  position: absolute;
  margin-left: 700px;
  padding: 10px 20px;
  &:hover {
    opacity: 0.8;
    border: 1px solid #26CC8B;
    border-radius: 90px;
    color: white;
  }
  &:focus {
    border: 1px solid #26CC8B;
    border-radius: 90px;
    color: white;
  }
`;

const Trend = styled.button<{ toogled: boolean }>`
  background: none;
  width: 170px;
  color: rgb(170, 170, 170);
  position: absolute;
  margin-left: 875px;
  border: 1px solid rgb(170, 170, 170);
  border-radius: 90px;
  padding: 10px 20px;
  &:hover {
    opacity: 0.8;
    border: 1px solid #26CC8B;
    color: white;
  }
  &:focus {
    border: 1px solid #26CC8B;
    color: white;
  }
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

const NFTTitle: React.FC<Props> = ({ children, bordered = true, size = 'default', shouldHideHeader, color }) => {
  const [toogled, setToogled] = useState(true);

  return (
    <Container bordered={bordered} size={size}>
      <Text size={size === 'default' ? 34 : 30} weight="900" color={color ? color : "white"}>
        {children}
      </Text>
      <button css={asset}>Sell Assets</button>
      <button css={listing}>Activate Listings</button>
      <Trend onClick={() => setToogled(!toogled)} toogled={toogled}>Trending
        <img src={arrow} alt="toogle"/>
      </Trend>
    </Container>
  );
};

export default NFTTitle;
