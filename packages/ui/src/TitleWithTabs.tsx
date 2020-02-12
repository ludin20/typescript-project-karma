import React from 'react';
import styled from 'styled-components';

import { TabInterface } from './Tabs';

const Container = styled.div`
  padding-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  &::after {
    content: '';
    width: 50px;
    height: 4px;
    background: ${props => props.theme.green};
    border-radius: 5px;

    position: absolute;
    bottom: 0;
  }

  strong {
    font-size: 30px;
    color: #fff;
  }

  div {
    display: flex;
  }
`;

const Button = styled.button<{ active: boolean }>`
  background: none;
  color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.4)')};
  font-size: 18px;
  transition: color 0.2s;

  & + button {
    margin-left: 15px;
  }
`;

interface Props {
  children: React.ReactChild;
  tabs?: TabInterface[];
  active: number;
  setActive: (index: number) => void;
}

const TitleWithTabs: React.FC<Props> = ({ children, tabs, active, setActive }) => {
  return (
    <Container>
      <strong>{children}</strong>

      <div>
        {tabs.map((tab, index) => (
          <Button key={index} onClick={() => setActive(index)} active={active === index}>
            {tab.name}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default TitleWithTabs;
