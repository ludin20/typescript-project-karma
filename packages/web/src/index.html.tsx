import serialize from 'serialize-javascript';

import { GA_ID } from './config';

const NODE_ENV = process.env.NODE_ENV;

const indexHtml = ({ helmet, assets, styleTags, relayData, html, lang = 'en' }) => {
  return `
    <!doctype html>
      <html lang="${lang}">
      <head>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', "${GA_ID}");
        </script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Karma</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap" rel="stylesheet">
        <link rel="manifest" href="/site.webmanifest">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

        ${helmet.meta.toString()}
        <style>
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
            font: 1.4rem 'Roboto', sans-serif;
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
        </style>
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        ${styleTags}
      </head>
      <body>
        <div id="root">${html}</div>
        <script src="${assets.client.js}" defer${NODE_ENV === 'production' ? '' : ' crossorigin'}></script>
        <script>
          window.__RELAY_PAYLOADS__ = ${serialize(relayData, { isJSON: true })};
        </script>
        <script async src="https://unpkg.com/smoothscroll-polyfill/dist/smoothscroll.min.js"></script>
      </body>
    </html>`;
};

export default indexHtml;
