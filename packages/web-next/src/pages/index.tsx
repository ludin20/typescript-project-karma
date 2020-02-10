import React from 'react';

import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { theme } from '@karma/ui';

import { store, persistor } from '../store';

import Feed from '../modules/home/Feed';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Feed />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
