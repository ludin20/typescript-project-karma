import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import cookie from 'js-cookie';

import withoutAvatar from '../../assets/withoutAvatar.svg';
import home from '../../assets/home.svg';
import discover from '../../assets/discover.svg';
import activity from '../../assets/activity.svg';
import wallet from '../../assets/wallet.svg';

import { RootState } from '../../../store/ducks/rootReducer';

import { KARMA_AUTHOR } from '../../../common/config';

import BottombarItem from './BottombarItem';

const Container = styled.div`
  width: 100%;
  background: ${props => props.theme.dark};
  padding: 25px 37px 30px;
  border-radius: 25px 25px 0 0;
  box-shadow: 0 3px 20px #000000fd;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  bottom: 0;
  z-index: 4;

  @media (min-width: 700px) {
    display: none;
  }
`;

const Bottombar: React.FC = () => {
  const profile = useSelector((state: RootState) => state.user.profile);

  const router = useRouter();

  const selected = useMemo(() => {
    return router.pathname.replace('/', '');
  }, [router.pathname]);

  const cookies = cookie.get();

  return (
    <Container>
      <BottombarItem href="/home" as="/home" selected={selected.includes('home')} icon={home} />

      <BottombarItem
        href="/discover/[tab]"
        as="/discover/popular"
        selected={selected.includes('discover')}
        icon={discover}
      />

      <BottombarItem href="/activity" as="/activity" selected={selected.includes('activity')} icon={activity} />

      <BottombarItem href="/wallet" as="/wallet" selected={selected.includes('wallet')} icon={wallet} />

      <BottombarItem
        href="/profile/[username]/[tab]"
        as={`/profile/${cookies[KARMA_AUTHOR]}/media`}
        selected={selected.includes('profile')}
        icon={profile ? (profile.avatar as string) || withoutAvatar : ''}
      />
    </Container>
  );
};

export default Bottombar;
