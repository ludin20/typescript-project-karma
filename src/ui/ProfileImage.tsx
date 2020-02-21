import React from 'react';
import styled, { css } from 'styled-components';

import withoutAvatar from './assets/withoutAvatar.svg';

const Container = styled.img<{ online: boolean; size: 'default' | 'small' | 'big' }>`
  width: ${props => (props.size === 'default' ? '50px' : '40px')};
  height: ${props => (props.size === 'default' ? '50px' : '40px')};
  border-radius: 50%;
  margin-right: 8px;

  ${props =>
    props.size === 'big' &&
    css`
      width: 170px;
      height: 170px;
    `}
`;

interface Props {
  path: string;
  online: boolean;
  alt: string;
  size?: 'default' | 'small' | 'big';
}

const ProfileImage: React.FC<Props> = ({ path, online, alt, size = 'default', ...props }) => {
  return <Container {...props} src={path || withoutAvatar} online={online} alt={alt} size={size} />;
};

export default ProfileImage;
