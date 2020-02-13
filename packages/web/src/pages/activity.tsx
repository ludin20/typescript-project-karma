import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Tabs } from '@karma/ui';

import Layout from '../modules/layout/Layout';
import AllActivities from '../modules/activity/AllActivities';

import { readNotificationsRequest } from '../store/modules/activity/actions';

const Discover: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(readNotificationsRequest());
    }, 4000);
  }, [dispatch]);

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
