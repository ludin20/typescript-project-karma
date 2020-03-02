import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../../store/modules/rootReducer';

import CreateProfileModal from '../profile/CreateProfileModal';

import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';
import Aside from './aside/Aside';

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const isNewUser = useSelector((state: RootState) => state.auth.isNewUser);

  useEffect(() => {
    if (isNewUser) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }

    return () => {
      if (!isNewUser) {
        setModalIsOpen(false);
      }
    };
  }, [isNewUser]);

  const close = useCallback(() => {
    if (!isNewUser) {
      setModalIsOpen(false);
    }
  }, [isNewUser]);

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

      {modalIsOpen && <CreateProfileModal open close={close} />}
    </Wrapper>
  );
};

export default Layout;
