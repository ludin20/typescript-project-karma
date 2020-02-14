import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, createGlobalStyle } from 'styled-components';

//fonts don't load correctly without createGlobalStyle
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

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Karma</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap" rel="stylesheet" />
          {this.props.styleTags}
          <GlobalStyle />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
