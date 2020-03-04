import React from 'react';
import App from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import { theme, Layout, Seo } from '../ui';

import { store, persistor } from '../store';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Avenir';
    src: url('/fonts/AvenirBook.otf');
    src: url('/fonts/AvenirMedium.otf');
    src: url('/fonts/AvenirRoman.otf');
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100%;
  }

  #__next {
    height: 100vh;
  }

  html {
    font-size: 62.5%;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 58%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 54%;
    }
  }

  @media (max-width: 440px) {
    html {
      font-size: 50%;
    }
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-size: 14px;
    font-family: 'Avenir', sans-serif;
    font-weight: 500;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    border: 0;
    cursor: pointer;
  }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    const AuthLayout: React.FC = ({ children }) => <>{children}</>;

    const AppLayout = router.pathname === '/' ? AuthLayout : Layout;

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Seo {...pageProps.meta} />
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}
