import React from 'react';
import styled from 'styled-components';

export const Container = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(26, 27, 29, 0.8);

  display: ${props => (props.open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;

  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40000;

  overflow-y: scroll;
`;

export interface ModalProps {
  open: boolean;
  close(): void;
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
