import React, { useState } from 'react';
import styled from 'styled-components';

import { Sidebar, Header, Aside } from '../../ui';

const Wrapper = styled.div`
  background: ${props => props.theme.black};
  display: flex;
  width: 100%;
`;

const Container = styled.div<{ collapsed: boolean }>`
  width: calc(100% - 280px);
  padding-top: 30px;
  margin: 0 0 0 70px;

  position: relative;
  left: ${props => (!props.collapsed ? '0' : '-300px')};
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  padding: 30px 0 0;
  margin-right: 70px;
`;

const Layout: React.FC = ({ children, ...props }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Wrapper {...props}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Container collapsed={collapsed}>
        <Header />

        <ContentWrapper>
          <Content>{children}</Content>
          <Aside />
        </ContentWrapper>
      </Container>
    </Wrapper>
  );
};

export default Layout;
