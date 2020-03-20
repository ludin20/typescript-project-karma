import React from 'react';

import Grid from './Grid';

interface Props {
  medias: string[];
}

const New: React.FC<Props> = ({ medias }) => {
  return <Grid data={medias} />;
};

export default New;
