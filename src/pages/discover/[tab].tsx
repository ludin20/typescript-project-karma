import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { NextPage, NextPageContext } from 'next';

import { Tabs, Popular, New } from '../../ui';

import { discoverPopular, discoverNew } from '../../mock';

interface Props {
  tab: string;
  data: {
    id: string | number;
    image: string;
  }[];
}

const Discover: NextPage<Props> = ({ tab, data }) => {
  const router = useRouter();

  const tabs = [
    {
      name: 'Popular',
      render: () => Popular({ data: data }),
    },
    {
      name: 'New',
      render: () => New({ data: data }),
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

  return <Tabs title="Discover" tabs={tabs} paramTab={tab || ''} />;
};

interface Context extends NextPageContext {
  query: {
    tab?: string | null;
  };
}

Discover.getInitialProps = async ({ query }: Context) => {
  const tab = ['popular', 'new'].find(t => t === query.tab);

  const defaultData = {
    tab: query.tab,
    meta: { title: 'Karma/Discover' },
  };

  if (tab && tab === 'popular') {
    return {
      ...defaultData,
      data: discoverPopular,
    };
  }

  if (tab && tab === 'new') {
    return {
      ...defaultData,
      data: discoverNew,
    };
  }

  return {
    ...defaultData,
    data: [],
  };
};

export default Discover;
