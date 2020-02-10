import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap" rel="stylesheet" />
          <style>
            {`
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
                font-family: Montserrat, sans-serif;
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
          `}
          </style>
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
