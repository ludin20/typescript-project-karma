import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { TabInterface } from './Tabs';

const Container = styled.div`
  width: 100%;
  margin: 30px 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
`;

const Button = styled.button<{ active: boolean }>`
  width: 100%;
  max-width: calc(580px / 3);
  background: none;
  color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.4)')};
  font-size: 22px;
  transition: color 0.2s;

  /* & + button {
    margin-left: 15px;
  } */
`;

interface Props {
  tabs?: TabInterface[];
  active: number;
  setActive: (index: number) => void;
}

const TabHeader: React.FC<Props> = ({ tabs, active, setActive }) => {
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
      {tabs.map((tab, index) => (
        <Button key={index} onClick={() => handleClick(index)} active={active === index}>
          {tab.name}
        </Button>
      ))}
    </Container>
  );
};

export default TabHeader;
