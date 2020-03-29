import React from 'react';
import { NextPage } from 'next';
import nextCookie from 'next-cookies';
import Router, { useRouter } from 'next/router';

import { labels } from '../../ui/layout';
import PhoneForm from '../../ui/auth/PhoneForm';
import ValidateCode from '../../ui/auth/ValidateCode';

import { KARMA_SESS } from '../../common/config';
import validateTab from '../../util/validateTab';

const Auth: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;

  return tab === 'sign' ? <PhoneForm /> : <ValidateCode />;
};

Auth.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  validateTab(ctx, '/auth/sign', ['sign', 'validate']);

  const token = cookies[encodeURIComponent(KARMA_SESS)];

  if (token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/home' });
      ctx.res.end();
    } else {
      Router.push('/home');
    }
  }

  return { token, layoutConfig: { layout: labels.AUTH } };
};

export default Auth;
