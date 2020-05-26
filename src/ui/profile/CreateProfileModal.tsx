import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import cookie from 'js-cookie';

import { updateProfileRequest } from '../../store/ducks/user';

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
    url: string;
  } | null;
}

const CreateProfileModal: React.FC<Props> = ({ profile, ...props }) => {
  const dispatch = useDispatch();

  const author = cookie.get(KARMA_AUTHOR);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      displayname: '',
      username: '',
      bio: '',
      hash: '',
      url: '',
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      displayname: Yup.string().required('Name is required'),
      username: Yup.string().required('Username is required'),
      bio: Yup.string(),
      hash: Yup.string().required('User Image is required'),
      url: Yup.string(),
    }),
    onSubmit: input => {
      const oldProfile = {
        displayname: profile ? profile.displayname : '',
        username: profile ? profile.username : '',
        bio: profile ? profile.bio : '',
        hash: profile ? profile.hash : '',
        url: profile ? profile.url : '',
      };

      const newProfile = {
        displayname: input.displayname || profile.displayname,
        username: input.username ? input.username.slice(1, input.username.length) : profile.username,
        bio: input.bio || profile.bio,
        hash: input.hash || profile.hash,
        url: input.url || profile.url,
      };

      dispatch(updateProfileRequest(newProfile, oldProfile, props.close));
    },
  });

  return <ProfileModal {...props} formik={formik} title="Create Profile" author={author} />;
};

export default CreateProfileModal;
