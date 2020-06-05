import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';

import ModalWrapper, { ModalProps } from '../common/ModalWrapper';
import ImageInput from '../form/ImageInput';
import FormikInput from '../form/FormikInput';
import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';
import Title from '../common/Title';
import { updateUsernameTakenRequest } from '../../store/ducks/user';

export const Container = styled.form`
  width: 100%;
  max-width: 700px;
  background: ${props => props.theme.dark};
  padding: 30px 50px;
  border-radius: 20px;
  transform: translateY(25%);

  display: flex;
  flex-direction: column;

  @media (max-width: 700px) {
    transform: unset;
    height: 100%;
    padding: 50px 15px;
    border-radius: 0;
  }
`;

const SubmitButton = styled(Button)`
  height: 55px;
  font-size: 24px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface InputProps {
  flex?: boolean;
  warning?: boolean;
}
const Input = styled(FormikInput)<InputProps>`
  @media (max-width: 700px) {
    padding: 10px 14px;

    header > span {
      font-size: 13px;
    }

    input,
    textarea {
      font-size: 18px;
    }
  }

  ${props =>
    props.flex &&
    css`
      width: calc(100% - (82px + 30px));

      @media (max-width: 700px) {
        width: 100%;
      }
    `}
`;

interface Props extends ModalProps {
  formik: FormikProps<any>;
  title?: string;
  customHeader?: React.FC;
  author: string;
  usernametakenState: boolean;
  uploadPercent: number;
  isUploadingState: boolean;
}

const ProfileModal: React.FC<Props> = ({ title, customHeader: CustomHeader, formik, author, usernametakenState, uploadPercent, isUploadingState, ...props }) => {
  const { handleSubmit, isValid } = formik;
  const dispatch = useDispatch();

  return (
    <ModalWrapper {...props} withoutPaddingOnMobile>
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

          <Row align="center">
            <ImageInput name="hash" author={author} isUploadingState={isUploadingState} uploadPercent={uploadPercent} />
            <Space width={10} />
            <Input label="Name" name="displayname" placeholder="Enter Name" required bordered flex />
          </Row>

          <Space height={25} />

          <Input label="Username" name="username" required bordered placeholder="@username" mask="@" warning={usernametakenState} onChange={() => dispatch(updateUsernameTakenRequest(false))} />
          <Space height={25} />

          <Input
            label="Bio"
            name="bio"
            placeholder={`Tell everyone why you’re awesome\nTip: use emoji’s`}
            multiline
            bordered
          />
          <Space height={25} />

          <Input label="Website" name="url" mask="https://www." bordered />
          <Space height={25} />

          <SubmitButton type="submit" background="green" radius="rounded" disabled={!isValid}>
            Save
          </SubmitButton>
        </Container>
      </FormikProvider>
    </ModalWrapper>
  );
};
const mapStateToProps = state => ({
  usernametakenState: state.user.usernametaken,
  uploadPercent: state.action.uploadPercent,
  isUploadingState: state.action.isUploading,
});

export default connect(mapStateToProps)(ProfileModal);
