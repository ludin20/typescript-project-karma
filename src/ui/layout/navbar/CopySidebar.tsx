import React from 'react';
import styled from 'styled-components';

import Logo from '../../common/Logo';
import withoutAvatar from '../../assets/withoutAvatar.svg';

import { useS3Image } from '../../../hooks';

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
  author: string;
  profile: {
    username: string;
    displayname: string;
    author: string;
    hash: string;
    bio: string;
  } | null;
}

const CopySidebar: React.FC<Props> = ({ collapsed, setCollapsed, profile }) => {
  const avatar = useS3Image(profile?.hash, 'thumbSmall');

  return (
    <Container collapsed={collapsed} setCollapsed={setCollapsed}>
      <Logo size="small" collapsed={collapsed} />

      {/* {!collapsed && (
        <Header
          profile={{
            name: profile?.displayname,
            username: '@' + profile?.username,
            avatar: avatar || withoutAvatar,
          }}
          withAvatar={!!avatar}
        />
      )} */}

      <SidebarNav
        username={profile?.username}
        avatar={avatar || withoutAvatar}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
      />
    </Container>
  );
};

export default CopySidebar;
