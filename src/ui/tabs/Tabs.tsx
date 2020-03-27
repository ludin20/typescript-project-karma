import React, { useState, useEffect } from 'react';

import Space from '../common/Space';
import Loading from '../common/Loading';

import TabsHeader from './TabsHeader';

export interface TabInterface {
  name: string;
  render: React.FC;
}

interface Props {
  title?: string;
  paramTab?: string;
  tabs: TabInterface[];
  size?: 'default' | 'big';
  loading?: boolean;
}

const Tabs: React.FC<Props> = ({ title, tabs, paramTab, size = 'default', loading }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (paramTab) {
      const firstTab = tabs.findIndex(tab => tab.name.toLowerCase() === paramTab);
      setActive(firstTab);
    }
  }, []); // eslint-disable-line

  return (
    <>
      <TabsHeader tabs={tabs} setActive={setActive} active={active} size={size}>
        {title}
      </TabsHeader>
      <Space height={30} />

      {loading ? <Loading withContainer size="big" /> : tabs[active].render({})}
    </>
  );
};

export default Tabs;
