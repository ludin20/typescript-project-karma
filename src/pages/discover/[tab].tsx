import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';
import nextCookie from 'next-cookies';

import { Tabs, Template } from '../../ui';
import { labels } from '../../ui/layout';
import { withAuthSync } from '../../auth/WithAuthSync';
import { withApollo } from '../../apollo/Apollo';
import { KARMA_AUTHOR } from '../../common/config';
import validateTab from '../../util/validateTab';
import { useS3PostsMedias } from '../../hooks';

const GET_POSTS = graphql`
  query posts($accountname: String!, $page: Int, $pathBuilder: any, $postsStatus: String) {
    posts(accountname: $accountname, page: $page, postsStatus: $postsStatus)
      @rest(type: "Post", pathBuilder: $pathBuilder) {
      post_id
      imagehashes
      videohashes
    }
  }
`;

interface Props {
  tab: string;
  author: string;
}

const Discover: NextPage<Props> = ({ author, ...props }) => {
  const router = useRouter();
  const imgRef = useRef();

  const [tab, setTab] = useState(props.tab);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const defaultParams = useMemo(() => `?Page=${page}&Limit=90&domainId=${1}`, []);

  const { fetchMore, loading } = useQuery(GET_POSTS, {
    variables: {
      accountname: author,
      page: 1,
      postsStatus: 'home',
      pathBuilder: () => (tab === 'popular' ? `posts/popularv3${defaultParams}` : `posts${defaultParams}`),
    },
    onCompleted: data => {
      const results = data.posts.filter((post, idx) => data.posts.indexOf(post) == idx);
      setPosts(results);
    },
  });

  const medias = useS3PostsMedias(posts, 'thumbBig');

  useEffect(() => {
    const path = `/discover/${tab}`;

    if (path !== router.asPath) {
      setTab(router.query.tab as string);

      fetchMore({
        variables: {
          pathBuilder: () =>
            router.query.tab === 'popular' ? `posts/popularv3${defaultParams}` : `posts${defaultParams}`,
        },
        updateQuery: (_, { fetchMoreResult }) => fetchMoreResult,
      });
    }
  }, [defaultParams, fetchMore, router, tab]);

  const loadMorePosts = useCallback(() => {
    const params = `?Page=${page + 1}&Limit=15&domainId=${1}`;

    fetchMore({
      variables: {
        page: page + 1,
        pathBuilder: () => (tab === 'popular' ? `posts/popularv3${params}` : `posts${params}`),
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        setPage(page + 1);
        return Object.assign({}, previousResult, {
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        });
      },
    });
  }, [fetchMore, page, tab]);

  const tabs = useMemo(
    () => [
      {
        name: 'Popular',
        render: () => Template({ medias, loadMore: loadMorePosts, renderedRef: imgRef }),
      },
      {
        name: 'New',
        render: () => Template({ medias, loadMore: loadMorePosts, renderedRef: imgRef }),
      },
    ],
    [loadMorePosts, medias],
  );

  return <Tabs title="Discover" tabs={tabs} paramTab={tab || ''} loading={loading} />;
};

interface Context extends NextPageContext {
  query: {
    tab?: string | null;
  };
  apolloClient: ApolloClient<NormalizedCacheObject>;
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
