import React, { useState } from 'react';
import styled from 'styled-components';

import ModalWrapper, { ModalProps } from '../ModalWrapper';

import Header from './Header';
import ChangeValue from './ChangeValue';
import Form, { SendMoneyFormProps } from './Form';
import SuccessModal from './SuccessModal';

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  background: linear-gradient(90deg, #2adce8 0%, #26cc8b 100%);
  padding: 30px;
  border-radius: 25px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props extends ModalProps, SendMoneyFormProps {}

const SendMoneyModal: React.FC<Props> = ({ profile, handleSubmit, ...props }) => {
  const [value, setValue] = useState();

  const [to, setTo] = useState(profile ? profile.username : '');

  return (
    <ModalWrapper {...props}>
      <Container>
        <Header handleClose={props.close} liquidBalance="1,019,847" />

        <ChangeValue value={value} onChange={setValue} />

        <Form
          profile={profile}
          handleSubmit={() => handleSubmit(value, profile ? profile.username : to)}
          onChangeTo={setTo}
          to={to}
        />
      </Container>
    </ModalWrapper>
  );
};

export default SendMoneyModal;
