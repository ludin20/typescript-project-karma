import React from 'react';
import styled from 'styled-components';

const Container = styled.span<Props>`
  color: ${props => props.theme[props.color] || '#fff'};
  font-size: ${props => `${props.size}px` || '14px'};
  font-weight: ${props => props.weight || '500'};
`;

interface Props {
  color?: string;
  size?: number;
  weight?: string;
}

const Text: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Text;
