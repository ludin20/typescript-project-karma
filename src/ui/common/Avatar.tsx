import React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import withoutAvatar from '../assets/withoutAvatar.svg';

const Container = styled.img<{ online?: boolean; size: 'default' | 'small' | 'big'; css?: FlattenSimpleInterpolation }>`
  width: ${props => (props.size === 'default' ? '65px' : '50px')};
  height: ${props => (props.size === 'default' ? '65px' : '50px')};
  border-radius: 50%;

  @media (max-width: 550px) {
    width: ${props => (props.size === 'default' ? '65px' : '40px')};
    height: ${props => (props.size === 'default' ? '65px' : '40px')};
  }

  ${p => p.css}

  ${props =>
    props.size === 'big' &&
    css`
      width: 140px;
      height: 140px;

      @media (max-width: 1200px) {
        width: 120px;
        height: 120px;
      }

      @media (max-width: 550px) {
        width: 80px;
        height: 80px;
      }
    `}
`;

interface Props {
  src?: string;
  online?: boolean;
  alt: string;
  size?: 'default' | 'small' | 'big';
  onLoad?(): void;
  css?: FlattenSimpleInterpolation;
}

const Avatar: React.FC<Props> = ({ src, online = false, alt, size = 'default', ...props }) => {
  return <Container {...props} src={src || withoutAvatar} online={online} alt={alt} size={size} />;
};

export default Avatar;
