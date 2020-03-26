import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled, { FlattenSimpleInterpolation } from 'styled-components';

const Image = styled.img<{ loaded: boolean; css?: FlattenSimpleInterpolation }>`
  display: ${p => (p.loaded ? 'inherit' : 'none')};
  ${p => p.css}
`;

interface ShimmerImageProps {
  src: string;
  alt: string;
  css?: FlattenSimpleInterpolation;
  height?: string | number;
  width?: string | number;
}

const ShimmerImage: React.FC<ShimmerImageProps> = ({ height, width, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image {...props} onLoad={() => setLoaded(true)} loaded={loaded} />
      {!loaded && <Skeleton height={height || '100%'} width={width || '100%'} />}
    </>
  );
};

export default ShimmerImage;
