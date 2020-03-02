import React from 'react';
import styled from 'styled-components';

const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.justify || 'center'};
  justify-content: ${props => props.align || 'center'};
`;

interface Props {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
}

const Column: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Column;
