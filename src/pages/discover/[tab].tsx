import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useSelector, connect } from 'react-redux';
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
import { RootState } from '../../store/ducks/rootReducer';

const GET_POSTS = graphql`
  query posts($accountname: String!, $page: Int, $pathBuilder: any, $postsStatus: String) {
    posts(accountname: $accountname, page: $page, postsStatus: $postsStatus)
      @rest(type: "Post", pathBuilder: $pathBuilder) {
      post_id
      author
      author_displayname
      author_profilehash
      description
      voteStatus(upvoted: $upvoted) @client
      created_at
      last_edited_at
      imagehashes
      videohashes
      category_ids
      upvote_count
      downvote_count
      comment_count
      tip_count
      video_count
      username
    }
  }
`;

interface Props {
  tab: string;
  author: string;
  viewForm: boolean;
}

const Discover: NextPage<Props> = ({ author, viewForm, ...props }) => {
  const router = useRouter();
  const imgRef = useRef();

  const [tab, setTab] = useState(props.tab);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const defaultParams = useMemo(() => `?Page=${page}&Limit=90&domainId=${1}`, []);
  const { wax, eos, liquidBalance, following } = useSelector((state: RootState) => state.user.profile);
  const [upvoted, setUpvoted] = useState(JSON.parse(localStorage.getItem('upvoted')));

  const { fetchMore, loading } = useQuery(GET_POSTS, {
    variables: {
      accountname: author,
      upvoted: upvoted,
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
        render: () =>
          Template({
            posts,
            medias,
            loadMore: loadMorePosts,
            renderedRef: imgRef,
            wax: wax,
            eos: eos,
            liquidBalance: liquidBalance,
            upvoted: upvoted,
            viewForm: viewForm,
          }),
      },
      {
        name: 'New',
        render: () =>
          Template({
            posts,
            medias,
            loadMore: loadMorePosts,
            renderedRef: imgRef,
            eos: eos,
            liquidBalance: liquidBalance,
            upvoted: upvoted,
            viewForm: viewForm,
          }),
      },
    ],
    [loadMorePosts, medias],
  );

  return (
    <Tabs
      title="Discover"
      tabs={tabs}
      paramTab={tab || ''}
      loading={loading}
      viewForm={viewForm}
      isViewFormShow={true}
    />
  );
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

const mapStateToProps = state => ({
  viewForm: state.action.viewForm,
});

export default connect(mapStateToProps)(withAuthSync(withApollo({ ssr: true })(Discover)));
