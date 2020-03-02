import React from 'react';

import { discoverPopular } from '../../mock';

import Grid from './Grid';

const Popular: React.FC = () => {
  return <Grid data={discoverPopular} />;
};

export default Popular;
