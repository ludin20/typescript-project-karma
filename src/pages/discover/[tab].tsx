import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';
import nextCookie from 'next-cookies';

import { NormalizedCacheObject } from 'apollo-cache-inmemory';

import { withAuthSync } from '../../auth/WithAuthSync';
import { Tabs, Popular, New } from '../../ui';
import { labels } from '../../ui/layout';

import { withApollo } from '../../apollo/Apollo';

import { KARMA_AUTHOR, IPFS_S3 } from '../../common/config';
import validateTab from '../../util/validateTab';

const GET_POSTS = graphql`
  query posts($accountname: String!, $page: Int, $pathBuilder: any, $postsStatus: String) {
    posts(accountname: $accountname, page: $page, postsStatus: $postsStatus)
      @rest(type: "Post", pathBuilder: $pathBuilder) {
      post_id
      imagehashes
    }
  }
`;

interface Props {
  tab: string;
  author: string;
}

const Discover: NextPage<Props> = ({ author, ...props }) => {
  const router = useRouter();
  const [tab, setTab] = useState(props.tab);

  const defaultParams = '?Page=1&Limit=10&domainId=${1}';
  const defaultVariables = {
    accountname: author,
    page: 1,
    postsStatus: 'home',
    pathBuilder: () => (tab === 'popular' ? `posts/popularv3${defaultParams}` : `posts${defaultParams}`),
  };

  const { data, fetchMore } = useQuery(GET_POSTS, {
    variables: defaultVariables,
  });

  useEffect(() => {
    const href = '/discover/[tab]';
    const as = '/discover/popular';

    const isTab = ['popular', 'new'].find(t => t === router.query.tab);

    if (!isTab) {
      router.push(href, as, { shallow: true });
    }
  }, [router]);

  useEffect(() => {
    const path = `/discover/${tab}`;

    if (path !== router.asPath) {
      setTab(router.query.tab as string);

      fetchMore({
        variables: {
          ...defaultVariables,
          pathBuilder: () =>
            router.query.tab === 'popular' ? `posts/popularv3${defaultParams}` : `posts${defaultParams}`,
        },
        updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
      });
    }
  }, [defaultVariables, fetchMore, router.asPath, router.query.tab, tab]);

  const medias = useMemo(() => {
    return data
      ? data.posts.map(post => post.imagehashes.map(imagehash => `${IPFS_S3}/${imagehash}/thumbBig.jpg`)).flat()
      : [];
  }, [data]);

  const tabs = useMemo(
    () => [
      {
        name: 'Popular',
        render: () => Popular({ medias }),
      },
      {
        name: 'New',
        render: () => New({ medias }),
      },
    ],
    [medias],
  );

  return <Tabs title="Discover" tabs={tabs} paramTab={tab || ''} />;
};

interface Context extends NextPageContext {
  query: {
    tab?: string | null;
  };
}

Discover.getInitialProps = async (ctx: Context) => {
  const tab = validateTab(ctx, '/discover/popular', ['popular', 'new']);

  const cookies = nextCookie(ctx);
  const author = cookies[encodeURIComponent(KARMA_AUTHOR)];

  return {
    tab,
    meta: { title: 'Karma/Discover' },
    layoutConfig: { layout: labels.DEFAULT, shouldHideCreatePost: true },
    author,
  };
};

export default withAuthSync(withApollo({ ssr: true })(Discover));
