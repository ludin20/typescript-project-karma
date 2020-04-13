import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import nextCookies from 'next-cookies';

import { theme, SEO, GlobalStyle, getLayout } from '../ui';
import { store, persistor } from '../store';
import { KARMA_AUTHOR } from '../common/config';
import { initOnContext } from '../apollo/Apollo';
import { GET_PROFILE } from '../apollo/resolvers';

interface Props {
  author: string;
}

export default class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    const cookies = nextCookies(ctx);
    const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

    if (author) {
      initOnContext(ctx);
      await ctx.apolloClient.query({
        query: GET_PROFILE,
        variables: {
          accountname: author,
          domainID: 1,
        },
      });
    }

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, author };
  }

  render() {
    const { Component, pageProps, author } = this.props;

    const AppLayout = getLayout(pageProps.layoutConfig ? pageProps.layoutConfig.layout : '');

    return (
      <>
        <SEO {...pageProps.meta} />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <AppLayout {...pageProps.layoutConfig} author={author}>
                <Component {...pageProps} />
              </AppLayout>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </>
    );
  }
}
