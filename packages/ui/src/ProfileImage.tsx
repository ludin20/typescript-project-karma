import React from 'react';
import styled, { css } from 'styled-components';

import withoutAvatar from '../assets/withoutAvatar.svg';

const Container = styled.img<{ online: boolean; size: 'default' | 'small' | 'big' }>`
  width: ${props => (props.size === 'default' ? '50px' : '40px')};
  height: ${props => (props.size === 'default' ? '50px' : '40px')};
  border-radius: 50%;
  margin-right: 8px;

  /* ${props =>
    props.online &&
    css`
      &::after {
        content: '';
        width: 8px;
        height: 8px;
        background: ${props => props.theme.green};
        border-radius: 50%;

        position: absolute;
        top: 2px;
        right: -10px;
      }
    `} */

  ${props =>
    props.size === 'big' &&
    css`
      width: 110px;
      height: 110px;
    `}
`;

interface Props {
  path: string;
  online: boolean;
  alt: string;
  size?: 'default' | 'small' | 'big';
}

const ProfileImage: React.FC<Props> = ({ path, online, alt, size = 'default' }) => {
  return <Container src={path || withoutAvatar} online={online} alt={alt} size={size} />;
};

export default ProfileImage;
