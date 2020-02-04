import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from 'styled-components';

import theme from '../src/theme';

const Theme = StoryFn => (
  <ThemeProvider theme={theme}>
    <StoryFn />
  </ThemeProvider>
);

addDecorator(Theme);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.story\.((([tj])(s|sx))|mdx)$/), module);
