import React from 'react';
import styled from 'styled-components';

import { nftmarket } from '../../../mock';

import AsideNFTMarketCard from './AsideNFTMarketCard';

const Container = styled.div``;

interface Props {
  data: Array<any>;
}

const NFTMarket: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <AsideNFTMarketCard title="NFT Market" data={nftmarket} />
    </Container>
  );
};

export default NFTMarket;
