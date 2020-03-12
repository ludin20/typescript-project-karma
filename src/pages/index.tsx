import React from 'react';
import { NextPage, NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import styled from 'styled-components';
import Router from 'next/router';

import { AuthAside, Sign } from '../ui';
import { KARMA_SESS } from '../common/config';

const Container = styled.div`
  height: 100%;
  background: ${props => props.theme.blue};

  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 1200px) {
    width: 100%;
    height: 100%;

    > div {
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Auth: NextPage = props => {
  return (
    <Container {...props}>
      <div>
        <AuthAside />
        <Sign />
      </div>
    </Container>
  );
};

Auth.getInitialProps = async (ctx: NextPageContext) => {
  const cookies = nextCookie(ctx);

  const token = cookies[encodeURIComponent(KARMA_SESS)];

  if (token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/home' });
      ctx.res.end();
    } else {
      Router.push('/home');
    }
  }

  return { token };
};

export default Auth;
