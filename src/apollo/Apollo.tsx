import React from 'react';
import { NextPageContext, NextPage } from 'next';
import App from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';
import { AppContextType } from 'next/dist/next-server/lib/utils';
import { ApolloProvider } from '@apollo/react-hooks';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

import createApolloClient from './ApolloClient';

let globalApolloClient = null;

interface Context extends NextPageContext, AppContextType<Router> {
  apolloClient: any;
  apolloState: any;
  ctx: any;
}

export const initOnContext = (ctx: Context) => {
  const inAppContext = Boolean(ctx.ctx);

  const apolloClient = ctx.apolloClient || initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  apolloClient.toJSON = () => null;

  ctx.apolloClient = apolloClient;

  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }
  return ctx;
};

const initApolloClient = (initialState: NormalizedCacheObject, ctx: NextPageContext) => {
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, ctx);
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx);
  }

  return globalApolloClient;
};

interface Props {
  apolloClient?: ApolloClient<NormalizedCacheObject>;
  apolloState?: NormalizedCacheObject;
}

export const withApollo = ({ ssr = false } = {}) => PageComponent => {
  const WithApollo: NextPage<Props> = ({ apolloClient, apolloState, ...pageProps }) => {
    let client;
    if (apolloClient) {
      client = apolloClient;
    } else {
      client = initApolloClient(apolloState, undefined);
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: Context) => {
      const inAppContext = Boolean(ctx.ctx);
      const { apolloClient } = initOnContext(ctx);

      let pageProps = {};

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      } else if (inAppContext) {
        pageProps = await App.getInitialProps(ctx);
      }

      if (typeof window === 'undefined') {
        const { AppTree } = ctx;
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        if (ssr && AppTree) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');

            let props;
            if (inAppContext) {
              props = { ...pageProps, apolloClient };
            } else {
              props = { pageProps: { ...pageProps, apolloClient } };
            }

            await getDataFromTree(<AppTree {...props} />);
          } catch (error) {
            console.log('Error while running `getDataFromTree`', error); //eslint-disable-line no-console
          }

          Head.rewind();
        }
      }

      return {
        ...pageProps,
        apolloState: apolloClient.cache.extract(),
        apolloClient: ctx.apolloClient,
      };
    };
  }

  return WithApollo;
};
