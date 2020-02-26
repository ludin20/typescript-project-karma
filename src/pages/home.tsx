import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { CreateProfile } from '../ui';

import { ProfileProps, createProfileRequest } from '../store/modules/user/actions';

import Feed from '../modules/home/Feed';
import { RootState } from '../store/modules/rootReducer';

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const isNewUser = useSelector((state: RootState) => state.auth.isNewUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isNewUser) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }

    return () => {
      if (!isNewUser) {
        setModalIsOpen(false);
      }
    };
  }, [isNewUser]);

  const close = useCallback(() => {
    if (!isNewUser) {
      setModalIsOpen(false);
    }
  }, [isNewUser]);

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

  return (
    <>
      <CreateProfile open={modalIsOpen} close={close} formik={formik} />
      <Feed />
    </>
  );
}
