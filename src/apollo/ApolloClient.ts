import { NextPageContext } from 'next';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { RestLink } from 'apollo-link-rest';
import { withClientState } from 'apollo-link-state';
import clientFetch from 'isomorphic-unfetch';
import serverFetch, { Headers as ServerHeaders } from 'node-fetch';

import { SERVER_URL } from '../common/config';

import { resolvers, defaults } from './resolvers';

export const getUniquePostId = (id: number): string => `post:${id}`;
export const getUniqueCommentId = (id: number): string => `comment:${id}`;

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      post: (_, { post_id }, { getCacheKey }) => getCacheKey({ __typename: 'Post', post_id }),
    },
  },
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Post':
        return getUniquePostId(object.post_id);
      case 'Comment':
        return getUniqueCommentId(object.cmmt_id);
      case 'Profile':
        return object.author;
      default:
        defaultDataIdFromObject(object);
    }
  },
});

const client = typeof window !== 'undefined';
global.Headers = client ? global.Headers : ServerHeaders;
const customFetch = client ? clientFetch : serverFetch;

const stateLink = withClientState({
  cache,
  resolvers,
  defaults,
});

const restLink = new RestLink({
  uri: `${SERVER_URL}/`,
  customFetch,
});

export default function createApolloClient(initialState: NormalizedCacheObject, ctx: NextPageContext) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([stateLink, restLink]),
    cache,
  });
}
