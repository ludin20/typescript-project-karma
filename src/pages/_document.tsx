import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Helmet, { HelmetData } from 'react-helmet';

interface Props {
  styleTags: Array<React.ReactElement<{}>>;
  helmet: HelmetData;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags, helmet: Helmet.renderStatic() };
  }

  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  render() {
    return (
      <html {...this.helmetHtmlAttrComponents}>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600,700&display=swap" rel="stylesheet" />
          {this.helmetHeadComponents}
          {this.props.styleTags}
        </Head>
        <body {...this.helmetBodyAttrComponents} style={{ background: '#191A19' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
