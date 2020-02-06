import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';

import { renderRelayComponent } from '@karma/relay-ssr';

import notFound from './notFound';
import auth from './auth';

export const historyMiddlewares = [queryMiddleware];

export const routeConfig = [
  {
    name: 'root',
    path: '/',
    getComponent: () => import('../App').then(m => m.default),
    children: [...auth, ...notFound],
    render: renderRelayComponent,
  },
];

export const render = createRender({});
