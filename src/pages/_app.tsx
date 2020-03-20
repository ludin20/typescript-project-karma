import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import { theme, SEO, GlobalStyle, getLayout } from '../ui';

import { store, persistor } from '../store';

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    const AppLayout = getLayout(pageProps.layoutConfig ? pageProps.layoutConfig.layout : '');

    return (
      <>
        <SEO {...pageProps.meta} />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              <AppLayout {...pageProps.layoutConfig}>
                <Component {...pageProps} />
              </AppLayout>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </>
    );
  }
}
