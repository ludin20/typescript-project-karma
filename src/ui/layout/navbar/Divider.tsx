import React from 'react';
import styled, { css } from 'styled-components';

import sidemenu from '../../assets/sidemenu.svg';
import arrow from '../../assets/arrow-menu.svg';

const Container = styled.div<{ collapsed: boolean }>`
  width: 100%;
  height: 2px;
  margin: 50px 0;
  background: linear-gradient(90deg, rgba(32, 37, 46, 0.4) 0%, rgba(38, 204, 139, 0.4) 100%);

  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 22px;
    height: 40px;
    background: none;

    position: relative;
    right: -1px;

    img {
      height: 40px;
    }
  }

  ${props =>
    props.collapsed &&
    css`
      background: none;
      justify-content: center;

      button {
        width: 40px !important;
        height: 40px !important;
        margin: 20px 0;
        background: ${props => props.theme.black};
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      img {
        width: 12px;
        height: 12px !important;
      }
    `}

  @media (max-width: 1200px) {
    display: none;
  }
`;

interface Props {
  onClick(): void;
  collapsed: boolean;
}

const Divider: React.FC<Props> = ({ onClick, ...props }) => {
  return (
    <Container {...props}>
      <button onClick={() => onClick()}>
        <img src={!props.collapsed ? sidemenu : arrow} alt="collapse side menu" />
      </button>
    </Container>
  );
};

export default Divider;
