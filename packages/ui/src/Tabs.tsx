import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TitleWithTabs from './TitleWithTabs';
import TabHeader from './TabHeader';

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
}

const Tabs: React.FC<Props> = ({ title, tabs, paramTab }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (paramTab) {
      const firstTab = tabs.findIndex(tab => tab.name.toLowerCase() === paramTab);
      setActive(firstTab);
    }
  }, []); //eslint-disable-line

  return (
    <>
      {title ? (
        <TitleWithTabs tabs={tabs} setActive={setActive} active={active}>
          {title}
        </TitleWithTabs>
      ) : (
        <TabHeader tabs={tabs} setActive={setActive} active={active} />
      )}
      <Container>{tabs[active].render({})}</Container>
    </>
  );
};

export default Tabs;
