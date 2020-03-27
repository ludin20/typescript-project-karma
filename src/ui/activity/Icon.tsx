import React from 'react';
import styled from 'styled-components';

const Container = styled.img`
  width: 40px;
  height: 40px;

  @media (max-width: 500px) {
    display: none;
  }
`;

interface Props {
  src: string;
  alt: string;
}

const Icon: React.FC<Props> = props => {
  return <Container {...props} />;
};

export default Icon;
