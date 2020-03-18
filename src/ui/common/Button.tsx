import React from 'react';
import styled, { keyframes } from 'styled-components';

import logo from '../assets/loading.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.button<Props>`
  background: ${props => (props.background ? props.theme[props.background] : 'none')};
  color: ${props => props.color || props.theme.white};
  padding: 5px 20px;
  border: ${props => (props.border ? `2px solid ${props.borderColor}` : 'none')};
  border-radius: ${props => (props.radius === 'default' ? '8px' : '25px')};
  opacity: ${props => (!props.disabled ? '1' : '0.2')};
  cursor: ${props => (!props.disabled ? 'pointer' : 'not-allowed')};
  transition: all 0.2s;
`;

const LoadingImage = styled.img`
  height: 16px;
  animation: ${rotate} 1.5s infinite;
`;

interface Props extends React.ButtonHTMLAttributes<any> {
  background?: 'green' | 'darkGradient' | 'lightGradient' | 'dark' | 'lightGreen';
  color?: string;
  borderColor?: string;
  radius?: 'default' | 'rounded';
  disabled?: boolean;
  loading?: boolean;
  border?: boolean;
  css?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<Props> = ({ children, radius = 'default', borderColor = '#fff', ...props }) => {
  return (
    <Container radius={radius} borderColor={borderColor} {...props}>
      {props.loading ? <LoadingImage src={logo} alt="loading" /> : children}
    </Container>
  );
};

export default Button;
