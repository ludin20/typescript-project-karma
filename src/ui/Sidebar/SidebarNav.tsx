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

  > div {
    display: flex;

    span {
      margin-top: 5px;
    }
  }

  img {
    height: 22px;
    width: 22px;
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

      position: relative;

      &::after {
        content: '';
        width: 3px;
        height: 100%;
        background: ${props.theme.green};
        border-radius: 4px;

        position: absolute;
        right: 0;
        top: 0;
      }
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
          <span>Home</span>
        </div>
      </Link>
      <Link onClick={() => router.push('/discover/popular')} selected={selected.includes('discover')}>
        <div>
          <img src={discover} alt="Discover" />
          <span>Discover</span>
        </div>
      </Link>
      <Link onClick={() => router.push('/activity')} selected={selected.includes('activity')}>
        <div>
          <img src={activity} alt="Activity" />
          <span>Activity</span>
        </div>
        <span>{notifications}</span>
      </Link>
      <Link onClick={() => router.push('/wallet')} selected={selected.includes('wallet')}>
        <div>
          <img src={wallet} alt="Wallet" />
          <span>Wallet</span>
        </div>
      </Link>
      <Link onClick={() => router.push('/referAndEarn')} selected={selected.includes('referAndEarn')}>
        <div>
          <img src={referAndEarn} alt="Refer and Earn" />
          <span>Refer & Earn</span>
        </div>
      </Link>
      <Link onClick={() => router.push('/profile/media')} selected={selected.includes('profile')}>
        <div>
          <img src={profileImage as string} alt="Profile" />
          <span>Profile</span>
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
          <span>logout</span>
        </div>
      </Link>
    </Container>
  );
};

export default SidebarNav;
