import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

import { Tabs, AllActivities } from '../ui';

import { readNotificationsRequest } from '../store/modules/activity/actions';

const Discover: NextPage = () => {
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
    <>
      <Tabs title="Activity" tabs={tabs} />
    </>
  );
};

Discover.getInitialProps = async () => {
  return {
    meta: {
      title: 'Karma/Activity',
    },
  };
};

export default Discover;
