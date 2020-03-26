import React from 'react';
import styled, { FlattenSimpleInterpolation, keyframes } from 'styled-components';

import loading from '../assets/loading.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

const Image = styled.img<LoadindProps>`
  height: 16px;
  animation: ${rotate} 1.5s infinite;
  ${p => p.css}
`;

interface LoadindProps {
  withContainer?: boolean;
  css?: FlattenSimpleInterpolation;
  img?: string;
}

const Loading: React.FC<LoadindProps> = ({ img, withContainer, ...props }) => {
  if (withContainer) {
    return (
      <Container>
        <Image src={img || loading} alt="loading" {...props} />
      </Container>
    );
  }

  return <Image src={img || loading} alt="loading" {...props} />;
};

export default Loading;
