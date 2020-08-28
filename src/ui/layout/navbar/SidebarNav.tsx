import React, { useMemo, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import { RootState } from '../../../store/ducks/rootReducer';
import { signOutRequest } from '../../../store/ducks/auth';

import home from '../../assets/home.svg';
import discover from '../../assets/discover.svg';
import activity from '../../assets/activity.svg';
import wallet from '../../assets/wallet.svg';
import logout from '../../assets/logout.svg';

import { KARMA_AUTHOR } from '../../../common/config';

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

const SidebarNav: React.FC<Props> = ({ avatar, setCollapsed, collapsed }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.activity.notifications);
  const cookies = cookie.get();
  const meUsername = cookies[KARMA_AUTHOR];
  const selected = useMemo(() => {
    return router.pathname.replace('/', '');
  }, [router.pathname]);

  const logOut = useCallback(() => {
    dispatch(signOutRequest());
  }, [dispatch]);

  return (
    <Container collapsed={collapsed}>
      <SidebarItem href="/home" as="/home" selected={selected.includes('home')} icon={home}>
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

      <SidebarItem href="/activity" as="/activity" selected={selected.includes('activity')} icon={activity}>
        Activity
      </SidebarItem>

      <SidebarItem href="/wallet" as="/wallet" selected={selected.includes('wallet')} icon={wallet}>
        Wallet
      </SidebarItem>

      {meUsername != undefined ?
      <SidebarItem
        href="/profile/[username]/[tab]"
        as={`/profile/${cookies[KARMA_AUTHOR]}/media`}
        selected={selected.includes('profile')}
        icon={avatar}
      >
        Profile
      </SidebarItem>  : ""}

      <Divider onClick={() => setCollapsed(!collapsed)} collapsed={collapsed} />
      {meUsername != undefined ?  
        <SidebarItem onClick={logOut} selected={false} icon={logout}>
          Logout
        </SidebarItem> : ""}
    </Container>
  );
};

export default SidebarNav;
