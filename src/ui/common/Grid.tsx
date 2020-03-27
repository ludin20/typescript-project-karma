import React from 'react';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components';

const Container = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${p => `repeat(${p.columns}, 1fr)`};
  grid-gap: ${p => p.gap};
  align-items: ${p => (p.align ? 'center' : 'unset')};
  ${p => p.css}
`;

interface GridProps {
  columns: number | string;
  gap: number | string;
  align?: boolean;
  css?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
}

const Grid: React.FC<GridProps> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Grid;
