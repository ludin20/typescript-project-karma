import React from 'react';

import Layout from './Layout';

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
  NONE: {
    LABEL: 'NONE',
    COMPONENT: NoLayout,
  },
};
const { DEFAULT, NONE } = layouts;

export const labels = {
  [DEFAULT.LABEL]: DEFAULT.LABEL,
  [NONE.LABEL]: NONE.LABEL,
};

const getLayout = (layout: string) => {
  switch (layout) {
    case DEFAULT.LABEL:
      return DEFAULT.COMPONENT;

    default:
      return NONE.COMPONENT;
  }
};

export default getLayout;
