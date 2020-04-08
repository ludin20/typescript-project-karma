import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { RootState } from '../../store/ducks/rootReducer';
import { signRequest } from '../../store/ducks/auth';

import PhoneInput from '../form/PhoneInput';
import Column from '../common/Column';
import Row from '../common/Row';
import Text from '../common/Text';

import JoinCard from './JoinCard';

const PhoneForm: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      number: '',
    },
    validationSchema: yup.object().shape({
      number: yup.string().required(),
    }),
    validateOnMount: true,
    onSubmit: ({ number }) => {
      dispatch(signRequest(number));
    },
  });

  const { handleSubmit } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <Column>
        <Row justify="center">
          <p>
            <Text color="white" size={40} weight="900">
              Join{' '}
            </Text>
            <Text color="green" size={40} weight="900">
              {' '}
              KARMA
            </Text>
          </p>
        </Row>

        <JoinCard
          label="Login with phone number"
          input={<PhoneInput placeholder="Enter number here" name="number" />}
          legend="You will confirm a 6-digit code then your account will be created for you."
          submitText="Send"
          loading={loading}
          formik={formik}
        />
      </Column>
    </form>
  );
};

export default PhoneForm;
