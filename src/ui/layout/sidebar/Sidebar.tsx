import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Logo from '../../common/Logo';
import withoutAvatar from '../../assets/withoutAvatar.svg';

import { RootState } from '../../../store/modules/rootReducer';

import SidebarNav from './SidebarNav';

const Container = styled.div<{ collapsed: boolean; withAvatar: boolean }>`
  min-width: 280px;
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

      position: relative;

      section {
        width: 1px;
        height: 1px;
        box-shadow: 0 0 50px 30px #26cc8b;
        border-radius: 50%;

        position: absolute;
        top: 50%;
        left: 50%;
      }

      > img {
        position: relative;
        width: ${props => (props.withAvatar ? '75px' : '50px')};
        height: ${props => (props.withAvatar ? '75px' : ' 50px')};
        border-radius: 50%;
      }
    }

    strong {
      color: #fff;
      font-size: 24px;
      font-weight: 900;
      font-family: Montserrat, sans-serif;
    }

    span {
      color: #fff;
      margin-top: 5px;
      opacity: 0.4;
      font-size: 18px;
    }
  }
`;

interface Props {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  withAvatar?: boolean;
}

const Sidebar: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const profile = useSelector((state: RootState) => state.user.profile);

  return (
    <Container collapsed={collapsed} withAvatar={!!profile.avatar}>
      <Logo size="small" />
      <header>
        <div>
          <section />
          <img src={(profile.avatar as string) || withoutAvatar} alt={profile.name} />
        </div>
        <strong>{profile.name}</strong>
        <span>{profile.username}</span>
      </header>

      <SidebarNav
        username={profile.username}
        avatar={(profile.avatar as string) || withoutAvatar}
        setCollapsed={setCollapsed}
        collapsed={collapsed}
      />
    </Container>
  );
};

export default Sidebar;
