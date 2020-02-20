import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '../../store/modules/rootReducer';

import home from '../assets/home.svg';
import discover from '../assets/discover.svg';
import activity from '../assets/activity.svg';
import wallet from '../assets/wallet.svg';
import logout from '../assets/logout.svg';
import arrow from '../assets/arrow.svg';
import referAndEarn from '../assets/referAndEarn.svg';

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

const Link = styled.button<{ selected: boolean }>`
  background: none;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  margin-top: 30px;
  padding-right: 20px;
  opacity: 0.4;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }

  &:nth-child(6) {
    img {
      border-radius: 50%;
    }
  }

  &:nth-child(8) {
    margin-top: 0;
  }

  ${props =>
    props.selected &&
    css`
      opacity: 1;
      border-right: ${`4px solid ${props.theme.green}`};
    `}
`;

interface Props {
  profileImage: string | File;
  setCollapsed: (value: boolean) => void;
  collapsed: boolean;
  signOut: any;
}

const SidebarNav: React.FC<Props> = ({ profileImage, setCollapsed, collapsed, ...props }) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.activity.notifications);

  const selected = useMemo(() => {
    return router.pathname.replace('/', '');
  }, [router.pathname]);

  const signOut = () => {
    dispatch(props.signOut());
    router.push('/');
  };

  return (
    <Container>
      <Link onClick={() => router.push('/home')} selected={selected.includes('home')}>
        <div>
          <img src={home} alt="Home" />
          Home
        </div>
      </Link>
      <Link onClick={() => router.push('/discover/popular')} selected={selected.includes('discover')}>
        <div>
          <img src={discover} alt="Discover" />
          Discover
        </div>
      </Link>
      <Link onClick={() => router.push('/activity')} selected={selected.includes('activity')}>
        <div>
          <img src={activity} alt="Activity" />
          Activity
        </div>
        <span>{notifications}</span>
      </Link>
      <Link onClick={() => router.push('/wallet')} selected={selected.includes('wallet')}>
        <div>
          <img src={wallet} alt="Wallet" />
          Wallet
        </div>
      </Link>
      <Link onClick={() => router.push('/referAndEarn')} selected={selected.includes('referAndEarn')}>
        <div>
          <img src={referAndEarn} alt="Refer and Earn" />
          Refer & Earn
        </div>
      </Link>
      <Link onClick={() => router.push('/profile/media')} selected={selected.includes('profile')}>
        <div>
          <img src={profileImage as string} alt="Profile" />
          Profile
        </div>
      </Link>

      <div>
        <button onClick={() => setCollapsed(!collapsed)}>
          <img src={arrow} alt="arrow" />
        </button>
      </div>
      <Link onClick={signOut} selected={false}>
        <div>
          <img src={logout} alt="Logout" />
          logout
        </div>
      </Link>
    </Container>
  );
};

export default SidebarNav;
