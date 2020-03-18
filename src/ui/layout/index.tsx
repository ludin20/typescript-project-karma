import React from 'react';

import Layout from './Layout';
import AuthLayout from './auth/AuthLayout';

const NoLayout: React.FC = ({ children }) => <>{children}</>;

interface ILayouts {
  [x: string]: {
    LABEL: string;
    COMPONENT: React.FC<any>;
  };
}

export const layouts: ILayouts = {
  DEFAULT: {
    LABEL: 'DEFAULT',
    COMPONENT: Layout,
  },
  AUTH: {
    LABEL: 'AUTH',
    COMPONENT: AuthLayout,
  },
  NONE: {
    LABEL: 'NONE',
    COMPONENT: NoLayout,
  },
};
const { DEFAULT, AUTH, NONE } = layouts;

export const labels = {
  [DEFAULT.LABEL]: DEFAULT.LABEL,
  [AUTH.LABEL]: AUTH.LABEL,
  [NONE.LABEL]: NONE.LABEL,
};

const getLayout = (layout: string) => {
  switch (layout) {
    case DEFAULT.LABEL:
      return DEFAULT.COMPONENT;
    case AUTH.LABEL:
      return AUTH.COMPONENT;
    default:
      return NONE.COMPONENT;
  }
};

export default getLayout;
