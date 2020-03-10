import React from 'react';
import { NextPageContext, NextPage } from 'next';

import auth from './auth';

export const withAuthSync = (WrappedComponent: NextPage) => {
  const Wrapper = props => {
    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx: NextPageContext) => {
    const token = auth(ctx);

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
