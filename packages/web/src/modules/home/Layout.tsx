import React, { useState } from 'react';
import styled from 'styled-components';

import { Sidebar } from '@karma/ui';

const Wrapper = styled.div`
  background: ${props => props.theme.black};
  display: flex;
`;

const Container = styled.div``;

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

      <Container>
        <header>header</header>

        <Wrapper>
          {children}
          <aside>aside</aside>
        </Wrapper>
      </Container>
    </Wrapper>
  );
};

export default Layout;
