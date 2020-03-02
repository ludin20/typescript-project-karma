import React from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { ProfileProps, updateProfileRequest } from '../../store/modules/user/actions';
import { RootState } from '../../store/modules/rootReducer';

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

const UpdateProfileModal: React.FC<ModalProps> = props => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      avatar: profile.avatar || '',
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      website: profile.website,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      bio: Yup.string(),
      website: Yup.string(),
    }),
    validateOnMount: true,
    onSubmit: (values: ProfileProps) => {
      dispatch(updateProfileRequest(values));
      props.close();
    },
  });

  const CustomHeader: React.FC = () => {
    return (
      <Row>
        <Title bordered={false} size="small">
          Edit Profile
        </Title>
        <CloseButton>
          <img src={closeIcon} alt="close" />
        </CloseButton>
      </Row>
    );
  };

  return <ProfileModal {...props} formik={formik} customHeader={CustomHeader} />;
};

export default UpdateProfileModal;
