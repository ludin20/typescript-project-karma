import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div<Props>`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'space-between'};

  ${props =>
    props.flex &&
    css`
      flex: 1;
    `}
`;

interface Props {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  flex?: boolean;
}

const Row: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Row;
