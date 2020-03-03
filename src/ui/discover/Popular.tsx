import React from 'react';

import Grid from './Grid';

interface Props {
  data: {
    id: string | number;
    image: string;
  }[];
}

const Popular: React.FC<Props> = ({ data }) => {
  return <Grid data={data} />;
};

export default Popular;
