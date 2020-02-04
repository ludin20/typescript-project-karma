import queryMiddleware from 'farce/lib/queryMiddleware';
import createRender from 'found/lib/createRender';

import notFound from './notFound';

export const historyMiddlewares = [queryMiddleware];

export const routeConfig = [
  {
    name: 'root',
    path: '/',
    getComponent: () => import('../App').then(m => m.default),
    children: [...notFound],
  },
];

export const render = createRender({});
