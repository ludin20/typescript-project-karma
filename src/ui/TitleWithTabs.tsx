import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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
    background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
    border-radius: 5px;

    position: absolute;
    bottom: 0;
  }

  strong {
    font-size: 30px;
    font-weight: 900;
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
  font-weight: 900;
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
  const router = useRouter();

  const [_, route] = router.pathname.split('/');

  const handleClick = (index: number) => {
    setActive(index);
    pushToRoute(index);
  };

  const pushToRoute = (index: number) => {
    router.push(
      `/${route}/?tab=${tabs[index].name.toLocaleLowerCase()}`,
      `/${route}/${tabs[index].name.toLocaleLowerCase()}`,
      { shallow: true },
    );
  };

  return (
    <Container>
      <strong>{children}</strong>

      <div>
        {tabs.map((tab, index) => (
          <Button key={index} onClick={() => handleClick(index)} active={active === index}>
            {tab.name}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default TitleWithTabs;
