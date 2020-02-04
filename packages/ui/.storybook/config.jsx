import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import theme from '../src/theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

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
    
    body {
      -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
      font: 14px 'Roboto', sans-serif;
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


const Theme = StoryFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <StoryFn />
  </ThemeProvider>
);

addDecorator(Theme);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.story\.((([tj])(s|sx))|mdx)$/), module);
