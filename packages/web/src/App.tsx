import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { RouterState } from 'found';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { theme } from '@karma/ui';

import { store, persistor } from './store';

interface Props extends RouterState {
  children: React.ReactNode;
}

const App = ({ children, ...props }: Props) => {
  const [lastRoute, setLastRoute] = useState<string | null>(null);

  useEffect(() => {
    const { match } = props;
    if (Array.isArray(match.routes) && match.routes.length > 1) {
      if (lastRoute !== match.routes[1].name) {
        window.scrollTo(0, 0);
        setLastRoute(match.routes[1].name);
      }
    }
  }, [props, lastRoute]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
