import React from 'react';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import Router from 'next/router';

import { KARMA_SESS } from '../common/config';

const Index: NextPage = () => {
  return <div></div>;
};

const redirect = (route: string, ctx: NextPageContext) => {
  if (typeof window === 'undefined') {
    ctx.res.writeHead(302, { Location: route });
    ctx.res.end();
  } else {
    Router.push(route);
  }
};

Index.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);

  const token = cookies[encodeURIComponent(KARMA_SESS)];

  if (token) {
    redirect('/home', ctx);
  } else {
    redirect('/auth/sign', ctx);
  }
};

export default Index;
