import React from 'react';

import Layout from './Layout';
import ReferandEarnLayout from './ReferandEarnLayout';
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
  REFERANDEARN: {
    LABEL: 'REFERANDEARN',
    COMPONENT: ReferandEarnLayout,
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
const { DEFAULT, AUTH, NONE, REFERANDEARN } = layouts;

export const labels = {
  [DEFAULT.LABEL]: DEFAULT.LABEL,
  [REFERANDEARN.LABEL]: REFERANDEARN.LABEL,
  [AUTH.LABEL]: AUTH.LABEL,
  [NONE.LABEL]: NONE.LABEL,
};

const getLayout = (layout: string) => {
  switch (layout) {
    case DEFAULT.LABEL:
      return DEFAULT.COMPONENT;
    case REFERANDEARN.LABEL:
      return REFERANDEARN.COMPONENT;
    case AUTH.LABEL:
      return AUTH.COMPONENT;
    default:
      return NONE.COMPONENT;
  }
};

export default getLayout;
