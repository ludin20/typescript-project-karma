import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { updateProfileRequest } from '../../store/ducks/user';

import Title from '../common/Title';
import Row from '../common/Row';
import { ModalProps } from '../common/ModalWrapper';

import closeIcon from '../assets/close.svg';

import ProfileModal from './ProfileModal';

const CloseButton = styled.button`
  background: none;

  img {
    width: 30px;
    height: 30px;
  }
`;

interface Props extends ModalProps {
  profile: {
    username: string;
    displayname: string;
    author: string;
    hash: string;
    bio: string;
  } | null;
}

const EditProfileModal: React.FC<Props> = ({ profile, ...props }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      hash: '',
      name: '',
      username: '',
      bio: '',
      //website: '',
    },
    validationSchema: Yup.object().shape({
      hash: Yup.string(),
      username: Yup.string(),
      bio: Yup.string(),
      website: Yup.string(),
    }),
    validateOnMount: true,
    onSubmit: values => {
      const oldProfile = {
        name: profile.displayname,
        username: profile.username,
        bio: profile.bio,
        hash: profile.hash,
      };

      const newProfile = {
        hash: values.hash || profile.hash,
        name: values.name || profile.displayname,
        username: values.username || profile.username,
        bio: values.bio || profile.bio,
        //website: values.website || profile.website,
      };

      dispatch(updateProfileRequest(newProfile, oldProfile));
      props.close();
    },
  });

  const CustomHeader: React.FC = () => {
    return (
      <Row align="center" justify="space-between">
        <Title bordered={false} size="small">
          Edit Profile
        </Title>
        <CloseButton type="button" onClick={() => props.close()}>
          <img src={closeIcon} alt="close" />
        </CloseButton>
      </Row>
    );
  };

  return <ProfileModal {...props} formik={formik} customHeader={CustomHeader} author={profile.author} />;
};

export default EditProfileModal;
