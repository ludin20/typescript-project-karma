import React from 'react';
import styled from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';

import ModalWrapper, { ModalProps } from '../common/ModalWrapper';
import ImageInput from '../form/ImageInput';
import FormikInput from '../form/FormikInput';
import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';
import Title from '../common/Title';

export const Container = styled.form`
  width: 100%;
  max-width: 700px;
  background: ${props => props.theme.dark};
  padding: 30px 50px;
  margin: 40px 0;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
`;

const SubmitButton = styled(Button)`
  height: 55px;
  font-size: 24px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled(FormikInput)`
  flex: 1;
`;

interface Props extends ModalProps {
  formik: FormikProps<any>;
  title?: string;
  customHeader?: React.FC;
}

const ProfileModal: React.FC<Props> = ({ title, customHeader: CustomHeader, formik, ...props }) => {
  const { handleSubmit, isValid } = formik;

  return (
    <ModalWrapper {...props}>
      <FormikProvider value={formik}>
        <Container onSubmit={handleSubmit}>
          {CustomHeader ? (
            <CustomHeader />
          ) : (
            <Title bordered={false} size="small">
              {title}
            </Title>
          )}
          <Space height={35} />

          <Row>
            <ImageInput name="avatar" />
            <Input label="Name" name="name" placeholder="Enter Name" required bordered />
          </Row>

          <Space height={25} />

          <Input label="Username" name="username" required bordered mask="@" />
          <Space height={25} />

          <FormikInput
            label="Bio"
            name="bio"
            placeholder={`Tell everyone why you’re awesome\nTip: use emoji’s`}
            multiline
            bordered
          />
          <Space height={25} />

          <Input label="Website" name="website" mask="https://www." bordered />
          <Space height={25} />

          <SubmitButton type="submit" background="green" radius="rounded" disabled={!isValid}>
            Save
          </SubmitButton>
        </Container>
      </FormikProvider>
    </ModalWrapper>
  );
};

export default ProfileModal;
