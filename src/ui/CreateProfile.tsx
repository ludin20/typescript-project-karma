import React from 'react';
import styled from 'styled-components';

import ProfileModal, { Props } from './ProfileModal';
import Title from './Title';
import TextInput from './FormikInput';
import Button from './Button';
import Space from './Space';
import ImageInput from './ImageInput';

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled(TextInput)`
  flex: 1;
`;

const SubmitButton = styled(Button)`
  height: 50px;
  font-size: 18px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateProfile: React.FC<Props> = ({ open, close, formik }) => {
  const { handleSubmit, isValid } = formik;

  return (
    <ProfileModal open={open} close={close} handleSubmit={handleSubmit} formik={formik}>
      <Title bordered={false} size="small">
        Create Profile
      </Title>
      <Space height={35} />

      <Header>
        <ImageInput name="avatar" />
        <Input label="Name" name="name" placeholder="Enter Name" required bordered />
      </Header>
      <Space height={25} />

      <Input label="Username" name="username" required bordered mask="@" />
      <Space height={25} />

      <TextInput
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
    </ProfileModal>
  );
};

export default CreateProfile;
