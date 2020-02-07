import React, { useState } from 'react';
import styled from 'styled-components';

import { Sidebar, Header, Aside } from '@karma/ui';

const Wrapper = styled.div`
  background: ${props => props.theme.black};
  display: flex;
  width: 100%;
`;

const Container = styled.div<{ collapsed: boolean }>`
  width: calc(100% - 350px);
  margin-left: 300px;
  padding-top: 30px;
  margin: 0 50px;

  position: relative;
  left: ${props => (!props.collapsed ? '0' : '-300px')};
`;

const Content = styled.div`
  width: 100%;
  max-width: 550px;
  padding: 30px 0 0;
`;

interface Props {
  children: React.ReactChild;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper>
      <Sidebar
        profile={{
          imageUrl: `https://api.adorable.io/avatars/100/storybook`,
          name: 'storybook story',
          username: '@storybook',
          followers: '2.9k',
          power: '1.3m',
          following: '397',
        }}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <Container collapsed={collapsed}>
        <Header />

        <Wrapper>
          <Content>{children}</Content>
          <Aside />
        </Wrapper>
      </Container>
    </Wrapper>
  );
};

export default Layout;
