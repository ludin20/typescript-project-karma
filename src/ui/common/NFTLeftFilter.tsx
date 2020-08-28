import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import SearchBar from '../layout/header/SearchBar';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const Container = styled.div`
  width: 250px;
  align: 'center',
  padding-bottom: 10px;
  position: absolute;
  left: 1050px;
`;

const itemImage = css`
  border-radius: 100px;
  width: 25px;
  height: 25px;
`;

const icon = css`
  border-radius: 100px;
  width: 15px;
  height: 15px;
  background-color: #ea923e;
`;

const scrollbarprimary = css` 
  scrollbar-color: #FF774A #f5f5f5;
  background-color: #20252E !important;
  color: white !important;
  font-size: 14px !important;
  border-radius: 20px;
  height: 300px;
  &::-webkit-scrollbar {
    width: 12px;
    background-color: #F5F5F5;
    border-radius: 20px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #FF774A;
  }
`;

interface Props {
  changeNft: any;
  setLoading: any
}

const NFTLeftFilter: React.FC<Props> = ({changeNft, setLoading}) => {
  useEffect(() => {
    // setLoading(true);
    axios.get(`https://wax.api.atomicassets.io/atomicmarket/v1/stats/collections?collection_whitelist=alexartworks,alien.worlds,anyo.b1,aprenticeart,athalloffame,atomic,badcryptonft,badges.b1,boxmazeonwax,cheesmansart,chibisglobal,classeartacr,deadbabiesbg,dogpatchbrew,dopestickers,dripnwithwax,eosnationama,eosnhotsauce,giselxtotems,goblinsonwax,gpk.topps,inspectorgen,kaleidoscope,kogsofficial,krwingerarts,matthewsmaze,momentintime,niftywizards,officialhero,organicpics1,parodykidss2,pepe.hero,pokeyforever,radiosilence,ruummspringa,shipplememes,solarsystem1,splintercard,stickypeople,tenminuteart,theonlykarma,tone2tonenft,uplandfanart,uplandhotels,upliftart,uptonemotors,vigilantnfts,waxartcards1&sort=volume&order=desc&symbol=WAX`)
    .then(res => {
      setCollections(res.data.data.results);
      // setLoading(false);
    });
  }, []);
  
  useEffect(() => {
    axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&max_assets=1&limit=40&page=1&order=desc&sort=created&collection_name=&symbol=WAX&collection_blacklist=caricaturexx,election2o2o,garbagepailz,jesusnft1234,jipewrgvpiwp,kogsfail1234,metalslugnft,monalisanft1,pokemon12345,realelection,safexnft5555,streetfighte,varievarie12,waxforerotic,wwaxxxbabess&show_seller_contracts=false&contract_whitelist=niftywizards,sales.heroes,theonlykarma&seller_blacklist=')
    .then(res => {
      changeNft(res.data.data);
    });
  }, []);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      overflow: 'auto',
      maxHeight: 500,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    selected: {
      backgroundColor: 'red',
    },
  }));

  const classes = useStyles();
  const [selectedCollection, saveCollection] = React.useState("officialhero");
  const [open, setOpen] = React.useState(false);
  const [collections, setCollections] = React.useState([]);
  const [schemas, setSchemas] = React.useState([]);
  const handleClick = (collection_name, schema_name, type) => {
    if (type == 1) {
      if (open == false) {
        saveCollection(collection_name);
        axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&max_assets=1&limit=40&page=1&order=desc&sort=created&collection_name='+collection_name+'&symbol=WAX&collection_blacklist=caricaturexx,election2o2o,garbagepailz,jesusnft1234,jipewrgvpiwp,kogsfail1234,metalslugnft,monalisanft1,pokemon12345,realelection,safexnft5555,streetfighte,varievarie12,waxforerotic,wwaxxxbabess&show_seller_contracts=false&contract_whitelist=niftywizards,sales.heroes,theonlykarma&seller_blacklist=')
        .then(res => {
          changeNft(res.data.data);
        });
        setOpen(!open);

        axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/stats/schemas/'+collection_name+'?sort=volume&order=desc&symbol=WAX')
        .then(res => {
          setSchemas(res.data.data.results);
        });
      } else {
        setOpen(!open);
      }
    } else if (type == 2) {
      axios.get('https://wax.api.atomicassets.io/atomicmarket/v1/sales?state=1&max_assets=1&limit=40&page=1&order=desc&sort=created&collection_name='+collection_name+'&schema_name='+schema_name+'&symbol=WAX&collection_blacklist=caricaturexx,election2o2o,garbagepailz,jesusnft1234,jipewrgvpiwp,kogsfail1234,metalslugnft,monalisanft1,pokemon12345,realelection,safexnft5555,streetfighte,varievarie12,waxforerotic,wwaxxxbabess&show_seller_contracts=false&contract_whitelist=niftywizards,sales.heroes,theonlykarma&seller_blacklist=')
      .then(res => {
        changeNft(res.data.data);
      });
    }
  };
  return (
    <Container>
      {/* <SearchBar/> */}
      <List css={scrollbarprimary} component="nav" aria-labelledby="nested-list-subheader" 
        // subheader={
        // <ListSubheader component="div" id="nested-list-subheader">
        //   Nested List Items
        // </ListSubheader>
        // }
        className={classes.root}
      >
        {
          collections.map((item, index) => (
            <div key={index}>
            <ListItem button onClick={() => handleClick(item.collection_name, "", 1)}>
              <ListItemIcon>
                <img css={itemImage} src={"https://wax.atomichub.io/preview?ipfs=" + item.img + "&size=185&output=webp"}></img>
              </ListItemIcon>
              <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize: 18 }}>{item.collection_name}</Typography>}/>
              {(open && (selectedCollection == item.collection_name)) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            {(open && (selectedCollection == item.collection_name)) ?
              <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {schemas.map((schema, index) => (
                  <ListItem button selected onClick={() => handleClick("", schema.schema_name, 2)} className={classes.nested}>
                    <ListItemIcon>
                      <div css={icon}></div>
                    </ListItemIcon>
                    <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF', fontSize: 14 }}>{schema.schema_name}</Typography>}/>
                  </ListItem>
                ))}
              </List>
            </Collapse> : ""}
            </div>
          ))
        }
      </List>
    </Container>
  );
};

export default NFTLeftFilter;
