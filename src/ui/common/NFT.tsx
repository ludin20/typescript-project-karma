import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import logo from '../assets/karmas.png';

import Text from './Text';
import Row from './Row';
import Space from './Space';

const Container = styled.div`
  background-color: #20252E;
  width: 195px;
  display: inline-block;
  margin-right: 15px;
  margin-bottom: 15px;
  border-radius: 20px;
  text-align: center;
`;

const avatar = css`
  padding-top: 15px;
  width: 70%;
  padding-bottom: 5px;
`;

const icon = css`
  width: 14px;
`;

const iconbutton = css`
  border: 1px solid #26CC8B;
  background: #191A19;
  border-radius: 100px;
  width: 20px;
  margin-right: 5px;
  line-height: 22px;
  height: 20px;
`;

const asset = css`
  background: #191A19;
  width: 30px;
  color: rgb(170, 170, 170);
  position: absolute;
  border: 1px solid #26CC8B;
  border-radius: 90px;
  margin-top: 5px;
  margin-left: 130px;
`;

const title = css`
  color: white;
  padding-bottom: 5px;
  font-size: 14px;
  font-weight: bold;
`;

const description = css`
  color: #26cc8b;
  padding-bottom: 5px;
  font-size: 13px;
`;

const price = css`
  color: white;
  padding-bottom: 5px;
  opacity: 0.8;
`;

const Buybutton = styled.div<{ type?: 1 | 2 }>`
  background: ${props => props.type == 1 ? '#26CC8B' : 'rgb(214, 154, 47)'};
  height: 40px;
  width: 100%;
  border-radius: 0px 0px 20px 20px;
  padding-top: 15px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    cursor: pointer;
  }
`;

interface Props {
  data: []
}

const NFT: React.FC<Props> = ({data}) => {
  const [toogled, setToogled] = useState(true);

  return (
    <Container>
      <button css={asset}>{data.karma}</button>
      <img css={avatar} src={data.avatar}></img>
      <p css={title}>{data.name}</p>
      <p css={description}>{data.username}</p>
      <p css={price}><button css={iconbutton}><img css={icon} src={logo} alt="logo"/></button>{data.karma} KARMA</p>
      <Buybutton type={data.type}>Buy {data.karma} {data.type==1 ? 'KARMA' : 'WAX' }</Buybutton>
    </Container>
  );
};

export default NFT;
