import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import logo from '../assets/karmas.png';

import Text from './Text';
import Row from './Row';
import Space from './Space';

const Container = styled.div`
  background-color: #20252E;
  width: 185px;
  display: inline-block;
  margin-right: 25px;
  margin-bottom: 25px;
  border-radius: 20px;
  text-align: center;
`;

const avatar = css`
  padding-top: 15px;
  width: 70px;
  height: 130px;
  padding-bottom: 5px;
`;

const icon = css`
  width: 15px;
`;

const iconbutton = css`
  border: 1px solid #26CC8B;
  background: #191A19;
  border-radius: 100px;
  width: 17px;
  margin-right: 5px;
  line-height: 22px;
  height: 17px;
`;

const asset = css`
  background: #191A19;
  width: 30px;
  color: rgb(170, 170, 170);
  position: absolute;
  border: 1px solid #26CC8B;
  border-radius: 90px;
  margin-top: 5px;
  margin-left: 90px;
  font-size: 10px;
`;

const title = css`
  color: white;
  padding-bottom: 5px;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const description = css`
  color: #26cc8b;
  padding-bottom: 5px;
  font-size: 10px;
`;

const price = css`
  color: white;
  padding-bottom: 8px;
  opacity: 0.8;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Buybutton = styled.div<{ type?: 1 | 2 }>`
  background: ${props => props.type == 1 ? '#26CC8B' : '#FF774A'};
  height: 40px;
  width: 100%;
  border-radius: 0px 0px 20px 20px;
  padding-top: 10px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    cursor: pointer;
  }
`;

interface Props {
  data: any
}

const NFT: React.FC<Props> = ({data}) => {
  var amount = (data.listing_price / 1000000) + '';
  var num = Number(amount).toLocaleString('en'); 
  if (num == "NaN")
    data.listing_price = 0;
  else
    data.listing_price = num;
  return (
    <Container>
      <button css={asset}>{data.assets[0].template_mint}</button>
      <img css={avatar} src={"https://wax.atomichub.io/preview?ipfs=" + data.assets[0].data.img + "&size=185&output=webp&animated=true"}></img>
      <p css={title}>{data.assets[0].data.name}</p>
      <p css={description}>{data.assets[0].collection.collection_name}</p>
      {/* <p css={price}>
        <button css={iconbutton}>
          <img css={icon} src={logo} alt="logo"/>
        </button><span>{data.listing_price / 1000000 * data.assets[0].collection.market_fee} KARMA</span>
        </button><span>{data.listing_price} KARMA</span>
      </p> */}
      {/* <Buybutton type={data.type}>Buy {data.listing_price} {data.type==1 ? 'KARMA' : 'WAX' }</Buybutton> */}
      <Buybutton type={data.type}>Buy {data.listing_price} {data.listing_symbol}</Buybutton>
    </Container>
  );
};

export default NFT;
