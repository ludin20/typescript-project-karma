import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';

import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';

import smartphone from '../assets/smartphone.svg';
import Text from '../common/Text';

import { authenticateWithScatter } from '../../store/ducks/auth';
import { authenticateWithWaxCloud } from '../../store/ducks/auth';

const Label = styled(Row)`
  span {
    color: #fff;
    font-size: 20px;
  }

  img {
    height: 30px;
  }
`;

const Legend = styled.p`
  width: 100%;

  &:first-child {
    margin: 0 0 10px;
    text-align: center;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
`;

const ScatterButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
  background: #009AFF;
`;

const WaxCloudButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
  background: #ff8b1c;
`;

interface Props {
  label: string;
  input: React.ReactNode;
  legend: string | React.ReactNode;
  submitText: string;
  loading: boolean;
  formik: FormikProps<any>;
}

const JoinCard: React.FC<Props> = ({ label, input, legend, submitText, loading, formik }) => {
  const { isValid } = formik;
  const dispatch = useDispatch();

  const onScatterSign = () => {
    dispatch(authenticateWithScatter());
  };

  const onWaxCloudSign = () => {
    dispatch(authenticateWithWaxCloud());
  };

  return (
    <FormikProvider value={formik}>
      <Space height={30} />
      <Label justify="flex-start">
        <img src={smartphone} alt="smartphone" />
        <Space width={15} />
        <Text color="white" size={13} lineHeight="18px">
          {label}
        </Text>
      </Label>
      <Space height={30} />

      {input}
      <Space height={15} />
      <Legend>
        {typeof legend === 'string' ? (
          <Text color="white" size={13} lineHeight="18px">
            {legend}
          </Text>
        ) : (
          legend
        )}
      </Legend>
      <Space height={30} />

      <SubmitButton loading={loading} background="green" disabled={!isValid || loading} type="submit">
        {submitText}
      </SubmitButton>
      <Space height={20} />
      <WaxCloudButton onClick={onWaxCloudSign}>Wax Cloud Wallet</WaxCloudButton>
      <Space height={20} />
      <ScatterButton onClick={onScatterSign}>Sign In With Scatter</ScatterButton>
    </FormikProvider>
  );
};

export default JoinCard;
