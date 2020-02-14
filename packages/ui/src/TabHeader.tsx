import React from 'react';
import styled from 'styled-components';

import { TabInterface } from './Tabs';

const Container = styled.div`
  width: 100%;
  margin: 30px 0;

  display: flex;
  justify-content: space-around;
`;

const Button = styled.button<{ active: boolean }>`
  background: none;
  color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.4)')};
  font-size: 22px;
  transition: color 0.2s;

  & + button {
    margin-left: 15px;
  }
`;

interface Props {
  tabs?: TabInterface[];
  active: number;
  setActive: (index: number) => void;
}

const TabHeader: React.FC<Props> = ({ tabs, active, setActive }) => {
  return (
    <Container>
      {tabs.map((tab, index) => (
        <Button key={index} onClick={() => setActive(index)} active={active === index}>
          {tab.name}
        </Button>
      ))}
    </Container>
  );
};

export default TabHeader;
