import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TabsHeader from './TabsHeader';

const Container = styled.div`
  margin-top: 30px;
`;

export interface TabInterface {
  name: string;
  render: React.FC;
}

interface Props {
  title?: string;
  paramTab?: string;
  tabs: TabInterface[];
  size?: 'default' | 'big';
}

const Tabs: React.FC<Props> = ({ title, tabs, paramTab, size = 'default' }) => {
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

      <Container>{tabs[active].render({})}</Container>
    </>
  );
};

export default Tabs;
