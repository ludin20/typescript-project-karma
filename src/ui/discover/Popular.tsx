import React from 'react';

import Grid from './Grid';

interface Props {
  medias: string[];
}

const Popular: React.FC<Props> = ({ medias }) => {
  return <Grid data={medias} />;
};

export default Popular;
