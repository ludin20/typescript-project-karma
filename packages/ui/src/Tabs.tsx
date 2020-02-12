import React, { useState } from 'react';
import styled from 'styled-components';

import TitleWithTabs from './TitleWithTabs';

const Container = styled.div`
  margin-top: 30px;
`;

export interface TabInterface {
  name: string;
  render: React.FC;
}

interface Props {
  title: string;
  tabs: TabInterface[];
}

const Tabs: React.FC<Props> = ({ title, tabs }) => {
  const [active, setActive] = useState(0);

  return (
    <>
      <TitleWithTabs tabs={tabs} setActive={setActive} active={active}>
        {title}
      </TitleWithTabs>
      <Container>{tabs[active].render({})}</Container>
    </>
  );
};

export default Tabs;
