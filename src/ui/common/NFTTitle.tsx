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
  color: rgb(170, 170, 170);
  position: absolute;
  margin-left: 695px;
  padding: 5px 10px;
  font-size: 14px;
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

const listing = css`
  background: none;
  color: rgb(170, 170, 170);
  position: absolute;
  margin-left: 795px;
  padding: 5px 10px;
  font-size: 14px;
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
  background: #20252E;
  color: white;
  position: absolute;
  padding: 5px 25px 5px 10px;
  margin-left: 940px;
  border: 1px solid #ffffff1a;
  border-radius: 90px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
    border: 1px solid rgb(170,170,170);
    color: white;
  }
  &:focus {
    border: 1px solid rgb(170,170,170);
    color: white;
  }
  img {
    position: absolute;
    top: 12px;
    right: 8px;
    width: 10px;
    transform: ${props => props.toogled && 'rotate(0deg)'};
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
