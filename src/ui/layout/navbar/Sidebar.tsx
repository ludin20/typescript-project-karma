import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Logo from '../../common/Logo';
import withoutAvatar from '../../assets/withoutAvatar.svg';

import { RootState } from '../../../store/ducks/rootReducer';

import Header from './Header';
import SidebarNav from './SidebarNav';

const Container = styled.div<{ collapsed: boolean; setCollapsed(value: boolean): void }>`
  min-width: ${props => (!props.collapsed ? '280px' : '100px')};
  min-height: 100%;
  background: ${props => props.theme.dark};
  padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    min-width: 100px !important;
    max-width: 100px !important;
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const profile = useSelector((state: RootState) => state.user.profile);

  return (
    <Container collapsed={collapsed} setCollapsed={setCollapsed}>
      <Logo size="small" collapsed={collapsed} />

      {!collapsed && (
        <Header
          profile={{
            name: profile ? profile.name : '',
            username: profile ? profile.username : '',
            avatar: profile ? (profile.avatar as string) || withoutAvatar : '',
          }}
          withAvatar={profile ? !!profile.avatar : false}
        />
      )}

      <SidebarNav
        username={profile ? profile.username : ''}
        avatar={profile ? (profile.avatar as string) || withoutAvatar : ''}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
      />
    </Container>
  );
};

export default Sidebar;
