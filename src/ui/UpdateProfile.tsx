import React from 'react';
import styled from 'styled-components';

import ProfileModal, { Props } from './ProfileModal';
import Title from './Title';
import TextInput from './FormikInput';
import Button from './Button';
import Space from './Space';
import ImageInput from './ImageInput';

import closeIcon from './assets/close.svg';

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled(TextInput)`
  flex: 1;
`;

const SubmitButton = styled(Button)`
  height: 55px;
  font-size: 24px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  background: none;

  img {
    width: 30px;
    height: 30px;
  }
`;

const UpdateProfile: React.FC<Props> = ({ open, close, formik }) => {
  const { isValid } = formik;

  const handleSubmit = e => {
    e.preventDefault();

    formik.handleSubmit();
    close();
  };

  return (
    <ProfileModal open={open} close={close} handleSubmit={handleSubmit} formik={formik}>
      <Row>
        <Title bordered={false} size="small">
          Edit Profile
        </Title>
        <CloseButton>
          <img src={closeIcon} alt="close" />
        </CloseButton>
      </Row>
      <Space height={35} />

      <Row>
        <ImageInput name="avatar" />
        <Input label="Name" name="name" placeholder="Enter Name" required bordered />
      </Row>
      <Space height={25} />

      <Input label="Username" name="username" placeholder="@" required bordered mask="@" />
      <Space height={25} />

      <TextInput
        label="Bio"
        name="bio"
        placeholder={`Tell everyone why you’re awesome\nTip: use emoji’s`}
        multiline
        bordered
      />
      <Space height={25} />

      <Input label="Website" name="website" placeholder="https://www." bordered />
      <Space height={25} />

      <SubmitButton type="submit" background="green" radius="rounded" disabled={!isValid}>
        Save
      </SubmitButton>
    </ProfileModal>
  );
};

export default UpdateProfile;
