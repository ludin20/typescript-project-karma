import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { theme, SEO, GlobalStyle, getLayout } from '../ui';

import { store } from '../store';

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
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <AppLayout {...pageProps.layoutConfig}>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </Provider>
      </>
    );
  }
}
