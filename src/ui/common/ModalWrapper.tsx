import React from 'react';
import styled, { css } from 'styled-components';

export const Container = styled.div<ModalProps>`
  width: 100%;
  min-height: 100%;
  background: rgba(26, 27, 29, 0.8);

  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: ${props => props.justify || 'center'};

  position: fixed;
  left: 0;
  top: 0;
  z-index: 40000;

  overflow-y: scroll;

  ${props =>
    props.withoutBackgroundOnMobile &&
    css`
      @media (max-width: 700px) {
        background: none;
      }
    `}
`;

export interface ModalProps {
  open: boolean;
  close(): void;
  withoutBackgroundOnMobile?: boolean;
  justify?: string;
}

const ModalWrapper: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Container
      {...props}
      id="modal-wrapper"
      open={props.open}
      onClick={e => {
        const container = document.getElementById('modal-wrapper');

        if (e.target === container) {
          props.close();
        }
      }}
    >
      {children}
    </Container>
  );
};

export default ModalWrapper;
