import React from 'react';

import { Tabs } from '@karma/ui';

import Layout from '../modules/layout/Layout';
import Popular from '../modules/discover/Popular';
import New from '../modules/discover/New';

const Discover: React.FC = () => {
  const tabs = [
    {
      name: 'Popular',
      render: Popular,
    },
    {
      name: 'New',
      render: New,
    },
  ];

  return (
    <Layout>
      <Tabs title="Discover" tabs={tabs} />
    </Layout>
  );
};

export default Discover;
