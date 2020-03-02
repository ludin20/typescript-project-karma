import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Layout, Tabs, AllActivities } from '../ui';

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
  ];

  return (
    <Layout>
      <Tabs title="Activity" tabs={tabs} />
    </Layout>
  );
};

export default Discover;
