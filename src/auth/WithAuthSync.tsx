import React, { useEffect } from 'react';
import { NextPageContext, NextPage } from 'next';
import Router from 'next/router';

import auth from './auth';

export const withAuthSync = (WrappedComponent: NextPage) => {
  const Wrapper = props => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        Router.push('/');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = auth(ctx);

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
