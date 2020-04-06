import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cookie from 'js-cookie';

import { createProfileRequest } from '../../store/ducks/user';

import { ModalProps } from '../common/ModalWrapper';
import { KARMA_AUTHOR } from '../../common/config';

import ProfileModal from './ProfileModal';

interface Props extends ModalProps {
  profile: {
    username: string;
    displayname: string;
    author: string;
    hash: string;
    bio: string;
  } | null;
}

const CreateProfileModal: React.FC<Props> = ({ profile, ...props }) => {
  const dispatch = useDispatch();

  const author = cookie.get(KARMA_AUTHOR);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      name: profile ? profile.displayname || '' : '',
      username: profile ? profile.username || '' : '',
      bio: profile ? profile.bio || '' : '',
      hash: profile ? profile.hash || '' : '',
      //website: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      bio: Yup.string(),
      hash: Yup.string(),
      //website: Yup.string(),
    }),
    onSubmit: input => {
      const oldProfile = {
        name: profile ? profile.displayname : '',
        username: profile ? profile.username : '',
        bio: profile ? profile.bio : '',
        hash: profile ? profile.hash : '',
      };
      dispatch(createProfileRequest(input, oldProfile));
      props.close();
    },
  });

  return <ProfileModal {...props} formik={formik} title="Create Profile" author={author} />;
};

export default CreateProfileModal;
