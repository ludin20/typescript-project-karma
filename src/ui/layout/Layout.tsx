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
  width: ${props => (!props.collapsed ? 'calc(100% - 350px)' : 'calc(100% - 170px)')};
  padding: 30px 0 50px;
  margin: 0 0 0 60px;

  left: ${props => (!props.collapsed ? '280px' : '100px')};

  position: relative;

  @media (max-width: 1200px) {
    min-width: calc(100% - 170px) !important;
    max-width: calc(100% - 170px) !important;

    left: 100px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  margin-top: 80px;
`;

const Content = styled.div`
  width: 100%;
  margin-right: calc(368px + 60px);

  @media (max-width: 1050px) {
    margin-right: 30px;
  }
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
        <Header collapsed={collapsed} />

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
