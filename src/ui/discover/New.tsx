import React from 'react';

import { discoverNew } from '../../mock';

import Grid from './Grid';

const New: React.FC = () => {
  return <Grid data={discoverNew} />;
};

export default New;
