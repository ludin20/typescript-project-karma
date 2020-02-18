import React, { useEffect } from 'react';

import { Tabs } from '@karma/ui';

import { useRouter } from 'next/router';

import Layout from '../modules/layout/Layout';
import Popular from '../modules/discover/Popular';
import New from '../modules/discover/New';

interface Props {
  tab: string;
}

const Discover: React.FC<Props> = ({ tab }) => {
  const router = useRouter();

  const tabs = [
    {
      name: 'Popular',
      render: Popular,
    },
    {
      name: 'New',
      render: New,
    },
  ];

  useEffect(() => {
    const isTab = tabs.find(t => t.name.toLocaleLowerCase() === tab);

    if (!isTab) {
      // router.push('/discover/popular');
    }
  }, [router, tab, tabs]);

  return (
    <Layout>
      <Tabs title="Discover" tabs={tabs} paramTab={tab || ''} />
    </Layout>
  );
};

/* Discover.getInitialProps = ({ query }) => {
  return {
    tab: query.tab,
  };
}; */

export default Discover;
