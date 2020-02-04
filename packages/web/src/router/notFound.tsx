import React from 'react';

//import { NotFound } from '@karma/ui';

const notFound = [
  {
    name: 'notFound',
    path: '*',
    // eslint-disable-next-line react/display-name
    Component: () => {
      return <div />;
    },
  },
];

export default notFound;
