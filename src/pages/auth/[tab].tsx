import React, { useEffect, useMemo } from 'react';
import { NextPage } from 'next';
import nextCookie from 'next-cookies';
import Router, { useRouter } from 'next/router';

import { labels } from '../../ui/layout';
import PhoneForm from '../../ui/auth/PhoneForm';
import ValidateCode from '../../ui/auth/ValidateCode';

import { KARMA_SESS } from '../../common/config';

const Auth: NextPage = () => {
  const router = useRouter();
  const { tab } = router.query;

  const isValidTab = useMemo(() => {
    return ['sign', 'validate'].find(t => t === tab);
  }, [tab]);

  useEffect(() => {
    const href = '/auth/[tab]';
    const as = `/auth/sign`;

    if (!isValidTab) {
      router.push(href, as, { shallow: true });
    }
  }, [isValidTab, router, tab]);

  if (!isValidTab) return <div></div>;

  return tab === 'sign' ? <PhoneForm /> : <ValidateCode />;
};

Auth.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);

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
