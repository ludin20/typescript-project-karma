import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '../../../store/modules/rootReducer';
import { signOut } from '../../../store/modules/auth/actions';

import home from '../../assets/home.svg';
import discover from '../../assets/discover.svg';
import activity from '../../assets/activity.svg';
import wallet from '../../assets/wallet.svg';
import logout from '../../assets/logout.svg';

import SidebarItem from './SidebarItem';
import Divider from './Divider';

const Container = styled.nav`
  width: 100%;
  margin-top: 5px;
  padding-left: 35px;

  display: flex;
  flex-direction: column;
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
    dispatch(signOut());
    router.push('/');
  }, [dispatch, router]);

  return (
    <Container>
      <SidebarItem route="/home" selected={selected.includes('home')} icon={home}>
        Home
      </SidebarItem>

      <SidebarItem route="/discover/popular" selected={selected.includes('discover')} icon={discover}>
        Discover
      </SidebarItem>

      <SidebarItem
        route="/activity"
        selected={selected.includes('activity')}
        icon={activity}
        extraContent={<span>{notifications}</span>}
      >
        Activity
      </SidebarItem>

      <SidebarItem route="/wallet" selected={selected.includes('wallet')} icon={wallet}>
        Wallet
      </SidebarItem>

      <SidebarItem
        route={`/profile/${username.split('@')[1]}/media`}
        selected={selected.includes('profile')}
        icon={avatar}
      >
        Profile
      </SidebarItem>

      <Divider onClick={() => setCollapsed(!collapsed)} />

      <SidebarItem onClick={logOut} selected={false} icon={logout}>
        Logout
      </SidebarItem>
    </Container>
  );
};

export default SidebarNav;
