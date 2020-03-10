import Router from 'next/router';
import nextCookie from 'next-cookies';
import { NextPageContext } from 'next';

const auth = (ctx: NextPageContext) => {
  const cookies = nextCookie(ctx);

  const token = cookies['sess'];

  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    } else {
      Router.push('/');
    }
  }

  return token;
};

export default auth;
