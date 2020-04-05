import React from 'react';
import styled from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';

import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';

import smartphone from '../assets/smartphone.svg';
import Text from '../common/Text';

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
    </FormikProvider>
  );
};

export default JoinCard;
