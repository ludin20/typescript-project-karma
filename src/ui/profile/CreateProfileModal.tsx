import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ProfileProps, createProfileRequest } from '../../store/ducks/user';

import { ModalProps } from '../common/ModalWrapper';

import ProfileModal from './ProfileModal';

const CreateProfileModal: React.FC<ModalProps> = props => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      name: '',
      username: '',
      bio: '',
      website: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      bio: Yup.string(),
      website: Yup.string(),
    }),
    onSubmit: (values: ProfileProps) => {
      dispatch(createProfileRequest(values));
    },
  });

  return <ProfileModal {...props} formik={formik} title="Create Profile" />;
};

export default CreateProfileModal;
