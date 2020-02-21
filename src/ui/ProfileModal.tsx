import React from 'react';
import styled from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';

export const Container = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  background: rgba(26, 27, 29, 0.8);

  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;

  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 40000;

  overflow-y: scroll;

  form {
    width: 100%;
    max-width: 853px;
    background: ${props => props.theme.dark};
    padding: 30px 50px;
    margin: 40px 0;
    border-radius: 20px;

    display: flex;
    flex-direction: column;
  }
`;

export interface Props {
  open: boolean;
  close: () => void;
  handleSubmit?: (data: any) => void;
  formik: FormikProps<any>;
}

const ProfileModal: React.FC<Props> = ({ open, close, handleSubmit, children, formik }) => {
  return (
    <Container
      id="container"
      open={open}
      onClick={e => {
        const container = document.getElementById('container');

        if (e.target === container) {
          close();
        }
      }}
    >
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>{children}</form>
      </FormikProvider>
    </Container>
  );
};

export default ProfileModal;
