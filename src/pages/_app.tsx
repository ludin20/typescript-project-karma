import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import nextCookies from 'next-cookies';

import { theme, SEO, GlobalStyle, getLayout } from '../ui';
import { store, persistor } from '../store';
import { KARMA_AUTHOR } from '../common/config';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const cookies = nextCookies(ctx);
    const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

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
