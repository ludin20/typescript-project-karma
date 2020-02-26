import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '../../store/modules/rootReducer';
import { signOut } from '../../store/modules/auth/actions';

import home from '../assets/home.svg';
import discover from '../assets/discover.svg';
import activity from '../assets/activity.svg';
import wallet from '../assets/wallet.svg';
import logout from '../assets/logout.svg';
import arrow from '../assets/arrow.svg';
import referAndEarn from '../assets/referAndEarn.svg';

import SidebarItem from './SidebarItem';

const Container = styled.nav`
  width: 100%;
  margin-top: 5px;
  padding-left: 35px;

  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
    height: 1px;
    margin: 30px 0;
    background: transparent linear-gradient(90deg, rgba(32, 37, 46, 0.4) 0%, rgba(38, 204, 139, 0.4) 100%) 0% 0%
      no-repeat padding-box;

    position: relative;

    button {
      width: 22px;
      height: 44px;
      background: ${props => props.theme.black};
      border-bottom-left-radius: 44px;
      border-top-left-radius: 44px;

      position: absolute;
      top: -20px;
      right: 0;

      img {
        width: 10px;
        height: 16px;
        transform: rotate(90deg);
      }
    }
  }
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

      <SidebarItem route="/referAndEarn" selected={selected.includes('referAndEarn')} icon={referAndEarn}>
        Refer & Earn
      </SidebarItem>

      <SidebarItem
        route={`/profile/${username.split('@')[1]}/media`}
        selected={selected.includes('profile')}
        icon={avatar}
      >
        Profile
      </SidebarItem>

      <div>
        <button onClick={() => setCollapsed(!collapsed)}>
          <img src={arrow} alt="arrow" />
        </button>
      </div>

      <SidebarItem onClick={logOut} selected={false} icon={logout}>
        Logout
      </SidebarItem>
    </Container>
  );
};

export default SidebarNav;
