import React from 'react';
import styled, { css, ThemeProvider } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
  }
}

const theme = {
  primaryColor: '#ffffff',
};

export const withThemeProvider = (Child: React.Component<any, any>) => props => (
  <ThemeProvider theme={theme}>
    <Child {...props} />
  </ThemeProvider>
);

export default theme;
