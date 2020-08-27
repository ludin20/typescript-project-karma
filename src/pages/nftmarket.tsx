import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../auth/WithAuthSync';
import { NFTTitle, NFTFilter, NFTLeftFilter } from '../ui';
import { labels } from '../ui/layout';

import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';
import NFT from '../ui/common/NFT';
import Space from '../ui/common/Space';
import { nft } from '../mock';
const Container = styled.div`
  max-width: 1280px;
  width: 1050px;
  height: 45vh;
  padding: 20px 0px;

  @media (max-width: 700px) {
    margin-top: 0;
    border-radius: 0 0 25px 25px;
    padding: 60px 20px;
  }

  > h1 {
    font-size: 54px;
    font-weight: 900;
    margin-bottom: 25px;

    @media (max-width: 700px) {
      font-size: 27px;
    }
  }

  > h3 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 45px;
    @media (max-width: 700px) {
      font-size: 18px;
    }
  }
`;

interface Props {
  profile: any;
}

const NFTMarket: NextPage<Props> = ({ profile }) => {
  const [nft, setNft] = React.useState([]);
  const changeNft = (data) => {
    setNft(data);
  }
  return (
    <>
      <NFTTitle>NFT Market</NFTTitle>
      <NFTFilter></NFTFilter>
      <Container>
        <NFTLeftFilter changeNft={changeNft}></NFTLeftFilter>
        {
          nft.map((item, index) => (
            <NFT data={item}>
              <Space height={15} />
            </NFT>
          ))
        }
      </Container>
    </>
  );
};

interface Context extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

NFTMarket.getInitialProps = async (ctx: Context) => {
  const cookies = nextCookie(ctx);

  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  ctx.apolloClient.writeData({
    data: {
      accountName: author,
    },
  });

  return {
    layoutConfig: { layout: labels.NFTMARKET, shouldHideHeader: true },
    meta: {
      title: 'NFT Market',
    },
    author,
  };
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(NFTMarket)));
