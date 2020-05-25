import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';
import nextCookie from 'next-cookies';

import { withAuthSync } from '../auth/WithAuthSync';
import { Tabs, AllActivities, Loading } from '../ui';
import { labels } from '../ui/layout';

import { readNotificationsRequest } from '../store/ducks/activity';
import { withApollo } from '../apollo/Apollo';
import { KARMA_AUTHOR } from '../common/config';
import { hasMoreTrue, hasMoreFalse } from '../store/ducks/action';

const GET_NOTIFICATIONS = graphql`
  query Notifications($accountname: String!, $page: Int, $pathBuilder: any) {
    notifications(accountname: $accountname, page: $page) @rest(type: "notification", pathBuilder: $pathBuilder) {
      sender
      trx_id
      receiver
      action
      data
      memo
      sender_displayname
      receiver_displayname
      receiver_profile_hash
      sender_profile_hash
      post_image_hashes
      post_video_hashes
      created_at
      username
    }
  }
`;

interface Props {
  author: string;
}

const Activity: NextPage<Props> = ({ author }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const { data, fetchMore, loading } = useQuery(GET_NOTIFICATIONS, {
    variables: {
      accountname: author,
      page: 1,
      postsStatus: 'activity',
      pathBuilder: () => `profile/history2/${author}?Page=1&Limit=12&domainId=${1}`,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      dispatch(readNotificationsRequest());
    }, 4000);
  }, [dispatch]);

  const loadMoreNotifications = useCallback(() => {
    fetchMore({
      variables: {
        page: page + 1,
        pathBuilder: () => `profile/history2/${author}?Page=${page + 1}&Limit=12&domainId=${1}`,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.notifications.length == 0) {
          dispatch(hasMoreFalse());
          return Object.assign({}, previousResult, {
            notifications: [
              ...previousResult.notifications,
              { ...previousResult.notifications[previousResult.notifications.length - 1], action: 'end' },
            ],
          });
        }
        if (fetchMoreResult.notifications.length < 12) dispatch(hasMoreFalse());
        else dispatch(hasMoreTrue());
        setPage(page + 1);
        return Object.assign({}, previousResult, {
          notifications: [...previousResult.notifications, ...fetchMoreResult.notifications],
        });
      },
    });
  }, [author, fetchMore, page]);

  const tabs = [
    {
      name: 'All',
      render: () => AllActivities({ data: data ? data.notifications : [], loadMore: loadMoreNotifications }),
    },
  ];

  return (
    <>
      <Tabs title="Activity" tabs={tabs} loading={loading} />
    </>
  );
};

Activity.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  return {
    meta: {
      title: 'Karma/Activity',
    },
    author,
    layoutConfig: { layout: labels.DEFAULT, shouldHideCreatePost: true },
  };
};

export default withAuthSync(withApollo({ ssr: true })(Activity));
