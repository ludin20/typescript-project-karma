import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const Container = styled.div<Props>`
  display: flex;
  align-items: ${p => p.align};
  justify-content: ${p => p.justify};
  ${p => p.css};
  ${p =>
    p.flex &&
    css`
      flex: 1;
    `}
`;

interface Props {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  flex?: boolean;
  onClick?(): void;
  css?: FlattenSimpleInterpolation;
  style?: React.CSSProperties;
}

const Row: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Row;
