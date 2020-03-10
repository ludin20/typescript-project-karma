import { NextPageContext } from 'next';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';

import { SERVER_URL } from '../common/config';

export default function createApolloClient(initialState: NormalizedCacheObject, ctx: NextPageContext) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: SERVER_URL,
      credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState),
  });
}
