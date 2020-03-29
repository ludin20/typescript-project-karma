import React, { useMemo, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '../../../store/ducks/rootReducer';
import { signOutRequest } from '../../../store/ducks/auth';

import home from '../../assets/home.svg';
import discover from '../../assets/discover.svg';
import activity from '../../assets/activity.svg';
import wallet from '../../assets/wallet.svg';
import logout from '../../assets/logout.svg';

import SidebarItem from './SidebarItem';
import Divider from './Divider';

const Container = styled.nav<{ collapsed: boolean }>`
  width: 100%;
  margin-top: 5px;
  padding-left: 35px;

  display: flex;
  flex-direction: column;

  @media (max-width: 1200px) {
    padding-left: 0;
    align-items: center;

    span {
      display: none;
    }

    button {
      padding-right: 0;
      width: 100%;
      justify-content: center;
    }
  }

  ${props =>
    props.collapsed &&
    css`
      padding-left: 0;
      align-items: center;

      span {
        display: none;
      }

      button {
        padding-right: 0;
        width: 100%;
        justify-content: center;
      }
    `}
`;

interface Props {
  username: string;
  avatar: string;
  setCollapsed: (value: boolean) => void;
  collapsed: boolean;
}

const SidebarNav: React.FC<Props> = ({ username, avatar, setCollapsed, collapsed }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.activity.notifications);

  const selected = useMemo(() => {
    return router.pathname.replace('/', '');
  }, [router.pathname]);

  const logOut = useCallback(() => {
    dispatch(signOutRequest());
  }, [dispatch]);

  return (
    <Container collapsed={collapsed}>
      <SidebarItem href="/home" as="home" selected={selected.includes('home')} icon={home}>
        Home
      </SidebarItem>

      <SidebarItem
        href="/discover/[tab]"
        as="/discover/popular"
        selected={selected.includes('discover')}
        icon={discover}
      >
        Discover
      </SidebarItem>

      <SidebarItem
        href="/activity"
        as="/activity"
        selected={selected.includes('activity')}
        icon={activity}
        extraContent={<span>{notifications}</span>}
      >
        Activity
      </SidebarItem>

      <SidebarItem href="/wallet" as="/wallet" selected={selected.includes('wallet')} icon={wallet}>
        Wallet
      </SidebarItem>

      <SidebarItem
        href="/profile/[username]/[tab]"
        as={`/profile/${username.split('@')[1]}/media`}
        selected={selected.includes('profile')}
        icon={avatar}
      >
        Profile
      </SidebarItem>

      <Divider onClick={() => setCollapsed(!collapsed)} collapsed={collapsed} />

      <SidebarItem onClick={logOut} selected={false} icon={logout}>
        Logout
      </SidebarItem>
    </Container>
  );
};

export default SidebarNav;
