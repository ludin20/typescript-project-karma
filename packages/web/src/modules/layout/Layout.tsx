import React, { useState } from 'react';
import styled from 'styled-components';

import { Sidebar, Header, Aside } from '@karma/ui';

import { useSelector } from 'react-redux';

import { signOut } from '../../store/modules/auth/actions';
import { RootState } from '../../store/modules/rootReducer';

const Wrapper = styled.div`
  background: ${props => props.theme.black};
  display: flex;
  width: 100%;
`;

const Container = styled.div<{ collapsed: boolean }>`
  width: calc(100% - 280px);
  padding-top: 30px;
  margin: 0 30px 0 50px;

  position: relative;
  left: ${props => (!props.collapsed ? '0' : '-300px')};

  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 630px;
  padding: 30px 0 0;
`;

const Layout: React.FC = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);
  const profile = useSelector((state: RootState) => state.user.profile);

  return (
    <Wrapper {...props}>
      <Sidebar profile={profile} collapsed={collapsed} setCollapsed={setCollapsed} signOut={signOut} />

      <Container collapsed={collapsed}>
        <Header />

        <div>
          <Content>{children}</Content>
          <Aside />
        </div>
      </Container>
    </Wrapper>
  );
};

export default Layout;
