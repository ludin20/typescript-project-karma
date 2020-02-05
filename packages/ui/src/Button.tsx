import React from 'react';

import styled from 'styled-components';

const Container = styled.button<Props>`
  background: ${props => (props.background ? props.theme[props.background] : 'none')};
  color: ${props => props.color || props.theme.white};
  padding: 5px 20px;
  border: ${props => (props.border ? '1px solid #fff' : 'none')};
  border-radius: ${props => (props.radius === 'default' ? '8px' : '26px')};
  opacity: ${props => (!props.disabled ? '1' : '0.7')};
  cursor: ${props => (!props.disabled ? 'pointer' : 'not-allowed')};
`;

interface Props {
  background?: 'green' | 'darkGradient' | 'lightGradient' | 'dark';
  color?: string;
  radius?: 'default' | 'rounded';
  disabled?: boolean;
  loading?: boolean;
  border?: boolean;
  children: React.ReactChild;
  css: React.CSSProperties;
}

const Button: React.FC<Props> = ({ children, radius = 'default', ...props }) => {
  return (
    <Container radius={radius} {...props}>
      {children}
    </Container>
  );
};

export default Button;
