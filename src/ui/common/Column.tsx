import React from 'react';
import styled, { FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components';

const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  ${p => p.css};
`;

interface Props {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  css?: FlattenInterpolation<ThemeProps<DefaultTheme>>;
  onClick?(): void;
}

const Column: React.FC<Props> = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Column;
