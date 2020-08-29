import React, { useEffect, createRef, useRef } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import Row from './Row';
import arrow from '../assets/arrow.svg';

const Container = styled(Row).attrs({
  align: 'center',
})<Props>`
  ${props =>
    props.bordered &&
    css`
      width: 1030px;
      padding-bottom: 10px;
      padding-top: 30px;
      position: relative;
      overflow: hidden;
      display: inline-flex;
    `}
`;

const collectionbutton = css`
  background: #20252E;
  color: white;
  border: 1px solid #ffffff1a;
  padding: 5px 14px;
  border-radius: 90px;
  margin-right: 10px;
  font-size: 14px;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    border: 1px solid rgb(170,170,170);
    border-radius: 90px;
    color: black;
    background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
  }
`;

const Toggle = styled.button<{ toogled: boolean }>`
  background: none;
  width: 20px;
  transform: rotate(270deg);
  img {
    width: 14px;
  }
`;

interface Props {
  bordered?: boolean;
  size?: 'default' | 'small';
  shouldHideHeader?: boolean;
  color?: string;
  changeNft: any;
  setLoading: any;
}

const NFTFilter: React.FC<Props> = ({ children, bordered = true, size = 'default', shouldHideHeader, color, changeNft, setLoading }) => {
  const [collections, setCollections] = React.useState([]);
  const [showData, setShowData] = React.useState([]);
  const [idx, setIdx] = React.useState(1);
  useEffect(() => {
    axios.get(`https://wax.api.atomicassets.io/atomicmarket/v1/stats/collections?collection_whitelist=alexartworks,alien.worlds,anyo.b1,aprenticeart,athalloffame,atomic,badcryptonft,badges.b1,boxmazeonwax,cheesmansart,chibisglobal,classeartacr,deadbabiesbg,dogpatchbrew,dopestickers,dripnwithwax,eosnationama,eosnhotsauce,giselxtotems,goblinsonwax,gpk.topps,inspectorgen,kaleidoscope,kogsofficial,krwingerarts,matthewsmaze,momentintime,niftywizards,officialhero,organicpics1,parodykidss2,pepe.hero,pokeyforever,radiosilence,ruummspringa,shipplememes,solarsystem1,splintercard,stickypeople,tenminuteart,theonlykarma,tone2tonenft,uplandfanart,uplandhotels,upliftart,uptonemotors,vigilantnfts,waxartcards1&sort=volume&order=desc&symbol=WAX`)
    .then(res => {
      const result = res.data.data.results;
      // result.unshift({'collection_name': 'All Collectinos'});
      setCollections(result);
      const temp = res.data.data.results.filter((item, index) => index < 8);
      setShowData(temp);
    });
  }, []);
  
  useEffect(() => {    
    axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&max_assets=1&limit=40&page=1&order=desc&sort=created&collection_name=&symbol=WAX&collection_blacklist=caricaturexx,election2o2o,garbagepailz,jesusnft1234,jipewrgvpiwp,kogsfail1234,metalslugnft,monalisanft1,pokemon12345,realelection,safexnft5555,streetfighte,varievarie12,waxforerotic,wwaxxxbabess&show_seller_contracts=false&contract_whitelist=niftywizards,sales.heroes,theonlykarma&seller_blacklist=')
    .then(res => {
      changeNft(res.data.data);
    });
  }, []);

  const handleClick = (collection_name) => {
    if (collection_name == "All Collectinos") {
      axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&max_assets=1&limit=40&page=1&order=desc&sort=created&collection_name=&symbol=WAX&collection_blacklist=caricaturexx,election2o2o,garbagepailz,jesusnft1234,jipewrgvpiwp,kogsfail1234,metalslugnft,monalisanft1,pokemon12345,realelection,safexnft5555,streetfighte,varievarie12,waxforerotic,wwaxxxbabess&show_seller_contracts=false&contract_whitelist=niftywizards,sales.heroes,theonlykarma&seller_blacklist=')
      .then(res => {
        changeNft(res.data.data);
      });
    } else {
      axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&max_assets=1&limit=40&page=1&order=desc&sort=created&collection_name='+collection_name+'&symbol=WAX&collection_blacklist=caricaturexx,election2o2o,garbagepailz,jesusnft1234,jipewrgvpiwp,kogsfail1234,metalslugnft,monalisanft1,pokemon12345,realelection,safexnft5555,streetfighte,varievarie12,waxforerotic,wwaxxxbabess&show_seller_contracts=false&contract_whitelist=niftywizards,sales.heroes,theonlykarma&seller_blacklist=')
      .then(res => {
        changeNft(res.data.data);
      });
    }
  }; 

  const toggleClick = () => {  
    setIdx(idx+1);    
    const temp = collections.filter((item, index) => (index >= ((idx+1) * 8) &&  index < ((idx+2) * 8)));
    if (temp.length < 7) {
      const temp = collections.filter((item, index) => index < 8);
      setShowData(temp);
      setIdx(0);
    } else {
      setShowData(temp);
    }
  }

  const handleScroll = () => {
  }

  return (
    <>
      <Container bordered={bordered} size={size} onScroll={() => handleScroll()}>
        {
          showData.map((item, index) => (
            <button key={index} css={collectionbutton} button onClick={() => handleClick(item.collection_name)}>{item.collection_name}</button>
          ))
        }
      </Container>
        
      <Toggle onClick={() => toggleClick()}>
        <img src={arrow} alt="toogle" />
      </Toggle>
    </>
  );
};

export default NFTFilter;
