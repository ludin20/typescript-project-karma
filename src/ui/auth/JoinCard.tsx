import React from 'react';
import styled from 'styled-components';

import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';

import smartphone from '../assets/smartphone.svg';

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

  span {
    color: #fff;
    font-size: 13px;
    line-height: 18px;
  }

  a {
    font-size: 13px;
    color: ${props => props.theme.green};
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
  disabled: boolean;
}

const JoinCard: React.FC<Props> = ({ label, input, legend, submitText, loading, disabled }) => {
  return (
    <div>
      <Space height={30} />
      <Label justify="flex-start">
        <img src={smartphone} alt="smartphone" />
        <Space width={15} />
        <span>{label}</span>
      </Label>
      <Space height={30} />

      {input}
      <Space height={15} />
      <Legend>{typeof legend === 'string' ? <span>{legend}</span> : legend}</Legend>
      <Space height={30} />

      <SubmitButton loading={loading} background="green" disabled={disabled || loading} type="submit">
        {submitText}
      </SubmitButton>
    </div>
  );
};

export default JoinCard;
