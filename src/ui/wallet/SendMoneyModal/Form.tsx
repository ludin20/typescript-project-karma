import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useField, useFormikContext } from 'formik';

import Button from '../../common/Button';
import Space from '../../common/Space';

import SendTo from './SendTo';

const Container = styled.div<{ empty: boolean }>`
  width: 50%;

  div:first-child {
    background: rgba(255, 255, 255, 0.19);
    box-shadow: 0px 3px 6px #0000001a;
    border-radius: 40px 40px 50px 50px;
  }

  textarea {
    width: 100%;
    background: none;
    color: #fff;
    padding: 20% 20px;
    border: none;
    font-size: 24px;
    font-weight: 900;
    text-align: center;

    -moz-appearance: textfield;

    resize: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  }

  @media (max-width: 800px) {
    width: unset;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  width: 100% !important;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 200px;
  font-size: 18px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface SendMoneyFormProps {
  profile?: {
    name: string;
    username: string;
    avatar: string;
  };
}

const Form: React.FC<SendMoneyFormProps> = ({ profile }) => {
  const [empty, setEmpty] = useState(true);

  const [memo] = useField('memo');
  const { setFieldValue, handleSubmit } = useFormikContext<any>();

  const onChange = useCallback(
    e => {
      if (e.target.value === '') {
        setEmpty(true);
      } else {
        setEmpty(false);
      }

      setFieldValue('memo', e.target.value);
    },
    [setFieldValue],
  );

  return (
    <>
      <Container empty={empty}>
        <div>
          <SendTo profile={profile} />

          <textarea onChange={onChange} value={memo.value} placeholder="What’s this for?" />
        </div>
        <Space height={26} />

        <SubmitButton type="submit" radius="rounded" onClick={handleSubmit}>
          Confirm
        </SubmitButton>
      </Container>
    </>
  );
};

export default Form;
