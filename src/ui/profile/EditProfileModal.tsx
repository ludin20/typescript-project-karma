import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileProps, updateProfileRequest } from '../../store/ducks/user';
import { RootState } from '../../store/ducks/rootReducer';

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

const EditProfileModal: React.FC<ModalProps> = props => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      avatar: '',
      name: '',
      username: '',
      bio: '',
      website: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string(),
      username: Yup.string(),
      bio: Yup.string(),
      website: Yup.string(),
    }),
    validateOnMount: true,
    onSubmit: (values: ProfileProps) => {
      const newProfile = {
        avatar: values.avatar || profile.avatar,
        name: values.name || profile.name,
        username: values.username || profile.username,
        bio: values.bio || profile.bio,
        website: values.website || profile.website,
      };

      dispatch(updateProfileRequest(newProfile));
      props.close();
    },
  });

  const CustomHeader: React.FC = () => {
    return (
      <Row>
        <Title bordered={false} size="small">
          Edit Profile
        </Title>
        <CloseButton type="button" onClick={() => props.close()}>
          <img src={closeIcon} alt="close" />
        </CloseButton>
      </Row>
    );
  };

  return <ProfileModal {...props} formik={formik} customHeader={CustomHeader} />;
};

export default EditProfileModal;
