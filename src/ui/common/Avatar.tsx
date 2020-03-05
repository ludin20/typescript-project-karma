import React from 'react';
import styled, { css } from 'styled-components';

import withoutAvatar from '../assets/withoutAvatar.svg';

const Container = styled.img<{ online: boolean; size: 'default' | 'small' | 'big' }>`
  width: ${props => (props.size === 'default' ? '50px' : '40px')};
  height: ${props => (props.size === 'default' ? '50px' : '40px')};
  border-radius: 50%;
  margin-right: 8px;

  @media (max-width: 550px) {
    width: ${props => (props.size === 'default' ? '50px' : '30px')};
    height: ${props => (props.size === 'default' ? '50px' : '30px')};
  }

    ${props =>
      props.size === 'big' &&
      css`
        width: 140px;
        height: 140px;

        @media (max-width: 550px) {
          width: 80px;
          height: 80px;
        }
      `}
  }
`;

interface Props {
  src?: string;
  online?: boolean;
  alt: string;
  size?: 'default' | 'small' | 'big';
}

const Avatar: React.FC<Props> = ({ src, online = false, alt, size = 'default', ...props }) => {
  return <Container {...props} src={src || withoutAvatar} online={online} alt={alt} size={size} />;
};

export default Avatar;
