import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';

import withoutAvatar from '../assets/withoutAvatar.svg';

import { ProfileProps } from '../../store/modules/user/actions';
import { signOut } from '../../store/modules/auth/actions';

import SidebarNav from './SidebarNav';

const Container = styled.div<Props>`
  width: 280px;
  min-height: 100%;
  background: ${props => props.theme.dark};
  padding: 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  top: 0;
  left: ${props => (!props.collapsed ? '0' : '-280px')};

  header {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      width: 90px;
      height: 90px;
      margin: 20px 0 15px;
      border-radius: 50%;
      border: ${props => `3px solid ${props.theme.green}`};
      box-shadow: 1px 1px 3px #26cc8b;

      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        width: ${props => (props.withAvatar ? '75px' : '50px')};
        height: ${props => (props.withAvatar ? '75px' : ' 50px')};
        border-radius: 50%;
      }
    }

    strong {
      color: #fff;
      font-size: 22px;
      font-weight: 900;
      font-family: Montserrat, sans-serif;
    }

    span {
      color: #fff;
      margin-top: 5px;
      opacity: 0.4;
      font-size: 16px;
    }
  }
`;

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  profile: ProfileProps;
  withAvatar?: boolean;
}

const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed, profile }) => {
  if (!profile) return <div />;

  return (
    <Container collapsed={collapsed} setCollapsed={setCollapsed} profile={profile} withAvatar={!!profile.avatar}>
      <Logo size="small" />
      <header>
        <div>
          <img src={(profile.avatar as string) || withoutAvatar} alt={profile.name} />
        </div>
        <strong>{profile.name}</strong>
        <span>{profile.username}</span>
      </header>

      <SidebarNav
        profileImage={profile.avatar || withoutAvatar}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
        signOut={signOut}
      />
    </Container>
  );
};

export default Sidebar;
