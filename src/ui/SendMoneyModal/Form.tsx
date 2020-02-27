import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Button from '../Button';

import SendTo from './SendTo';

const Container = styled.div<{ empty: boolean }>`
  background: rgba(255, 255, 255, 0.19);
  width: 50%;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 40px 40px 50px 50px;

  textarea {
    width: 100%;
    background: none;
    color: #fff;
    padding: 25% 20px;
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
`;

const SubmitButton = styled(Button)`
  width: 50%;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 200px;
  font-size: 18px;
  font-weight: 900;
  margin-top: 20px;

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
  handleSubmit?(value?: number, to?: string): void;
  onChangeTo?(value: string): void;
  to?: string;
}

const Form: React.FC<SendMoneyFormProps> = ({ profile, handleSubmit, onChangeTo, to }) => {
  const [empty, setEmpty] = useState(true);

  const onChange = useCallback(e => {
    if (e.target.value === '') {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, []);

  return (
    <>
      <Container empty={empty}>
        <SendTo profile={profile} onChangeTo={onChangeTo} to={to} />

        <textarea onChange={onChange} placeholder="What’s this for?" />
      </Container>

      <SubmitButton type="button" radius="rounded" onClick={() => handleSubmit()}>
        Confirm
      </SubmitButton>
    </>
  );
};

export default Form;
