import React from 'react';
import styled from 'styled-components';

import Logo from '../Logo';

import ProfileInfo from './ProfileInfo';
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
  left: ${props => (!props.collapsed ? '0' : '-300px')};

  header {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      width: 90px;
      height: 90px;
      margin: 20px 0 15px;
      border-radius: 50%;
      border: ${props => `4px solid ${props.theme.green}`};

      display: flex;
      justify-content: center;
      align-items: center;

      > img {
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
    }

    strong {
      color: #fff;
      font-weight: 600;
      font-size: 22px;
    }

    span {
      color: #fff;
      margin-top: 5px;
      opacity: 0.4;
      font-size: 16px;
    }
  }
`;

export interface ProfileProps {
  imageUrl: string;
  name: string;
  username: string;
  followers: string | number;
  power: string | number;
  following: string | number;
}

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  profile: ProfileProps;
  signOut: any;
}

const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed, profile, signOut }) => {
  if (!profile) return <div />;

  return (
    <Container collapsed={collapsed}>
      <Logo size="small" />
      <header>
        <div>
          <img src={profile.imageUrl} alt={profile.name} />
        </div>
        <strong>{profile.name}</strong>
        <span>{profile.username}</span>
      </header>

      <ProfileInfo profile={profile} />

      <SidebarNav profileImage={profile.imageUrl} setCollapsed={setCollapsed} collapsed={collapsed} signOut={signOut} />
    </Container>
  );
};

export default Sidebar;
