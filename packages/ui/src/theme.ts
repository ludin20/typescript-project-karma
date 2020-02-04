declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    white: string;
    green: string;
    darkGradient: string;
    lightGradient: string;
    dark: string;
  }
}

const theme = {
  primary: '#333333',
  white: '#ffffff',
  green: '#008000',
  darkGradient: 'linear-gradient(green, #333)',
  lightGradient: 'linear-gradient(green, #f4f4f4)',
  dark: '#333333',
};

export default theme;
