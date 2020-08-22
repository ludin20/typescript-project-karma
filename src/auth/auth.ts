import Router from 'next/router';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';

import { KARMA_SESS } from '../common/config';

const auth = (ctx: NextPageContext) => {
  if (ctx.pathname != '/post/[id]/author/[author]') {
    const cookies = nextCookie(ctx);
    const token = cookies[encodeURIComponent(KARMA_SESS)];
    
    if (!token) {
      if (typeof window === 'undefined') {
        ctx.res.writeHead(302, { Location: '/' });
        ctx.res.end();
      } else {
        Router.push('/');
      }
    }
    return token;
  }
};

export default auth;
