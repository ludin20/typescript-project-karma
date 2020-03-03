import React from 'react';

import Grid from './Grid';

interface Props {
  data: {
    id: string | number;
    image: string;
  }[];
}

const New: React.FC<Props> = ({ data }) => {
  return <Grid data={data} />;
};

export default New;
