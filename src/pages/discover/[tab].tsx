import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';

import { Tabs } from '../../ui';

import Layout from '../../modules/layout/Layout';
import Popular from '../../modules/discover/Popular';
import New from '../../modules/discover/New';

interface Props {
  tab: string;
}

const Discover: NextPage<Props> = ({ tab }) => {
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
    const href = '/discover/[tab]';
    const as = '/discover/popular';

    const isTab = tabs.find(t => t.name.toLocaleLowerCase() === tab);

    if (!isTab) {
      router.push(href, as, { shallow: true });
    }
  }, [router, tab, tabs]);

  return (
    <Layout>
      <Tabs title="Discover" tabs={tabs} paramTab={tab || ''} />
    </Layout>
  );
};

interface Context extends NextPageContext {
  query: {
    tab?: string | null;
  };
}

Discover.getInitialProps = async ({ query }: Context) => {
  return {
    tab: query.tab,
  };
};

export default Discover;
