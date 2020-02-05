declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    white: string;
    green: string;
    darkGradient: string;
    lightGradient: string;
    dark: string;
    gray: string;
    pink: string;
  }
}

const theme = {
  primary: '#59ca89',
  white: '#ffffff',
  green: '#59ca89',
  darkGradient: 'linear-gradient(green, #333)',
  lightGradient: 'linear-gradient(green, #f4f4f4)',
  dark: '#191a19',
  blue: '#20252d',
  gray: '#757676',
  pink: '#f9c6ce',
};

export default theme;
