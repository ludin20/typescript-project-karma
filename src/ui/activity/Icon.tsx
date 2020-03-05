import React from 'react';
import styled from 'styled-components';

const Container = styled.img`
  width: 30px;
  margin-right: 15px;

  @media (max-width: 550px) {
    width: 20px;
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
