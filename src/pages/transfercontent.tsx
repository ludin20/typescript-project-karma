import React from 'react';
import { NextPage } from 'next';
import nextCookie from 'next-cookies';
import Router, { useRouter } from 'next/router';

import { labels } from '../ui/layout';

import { KARMA_SESS } from '../common/config';
import TransferContent from '../ui/auth/TransferContent';

const TransferContentAuth: NextPage = () => {
  const router = useRouter();

  return <TransferContent />;
};

export default TransferContentAuth;
