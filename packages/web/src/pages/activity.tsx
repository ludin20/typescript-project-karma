import React from 'react';

import { Tabs } from '@karma/ui';

import Layout from '../modules/layout/Layout';

import AllActivities from '../modules/activity/AllActivities';

const Discover: React.FC = () => {
  const tabs = [
    {
      name: 'All',
      render: AllActivities,
    },
    {
      name: 'KARMA',
      render: AllActivities,
    },
    {
      name: 'Tags',
      render: AllActivities,
    },
  ];

  return (
    <Layout>
      <Tabs title="Activity" tabs={tabs} />
    </Layout>
  );
};

export default Discover;
