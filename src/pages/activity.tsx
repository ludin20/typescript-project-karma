import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';

import { withAuthSync } from '../auth/WithAuthSync';
import { Tabs, AllActivities } from '../ui';
import { labels } from '../ui/layout';

import { readNotificationsRequest } from '../store/ducks/activity';

const Activity: NextPage = () => {
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

Activity.getInitialProps = async () => {
  return {
    meta: {
      title: 'Karma/Activity',
    },
    layoutConfig: { layout: labels.DEFAULT, shouldHideCreatePost: true },
  };
};

export default withAuthSync(Activity);
