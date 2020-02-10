import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { PhoneInput, CodeInput, Button } from '@karma/ui';

import smartphone from '../../assets/smartphone.svg';

import { signRequest, authenticateCodeRequest } from '../../store/modules/auth/actions';

const Container = styled.form`
  width: 400px;
  max-width: 400px;
  background: ${props => props.theme.dark};
  padding: 50px 30px 60px;
  box-shadow: 0px 3px 20px #0000004d;
  border-radius: 25px;

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 200;

  p {
    align-self: center;

    strong {
      color: #fff;
      font-size: 40px;

      &:nth-child(2) {
        color: ${props => props.theme.green};
      }
    }
  }

  > section {
    margin: 30px 0 30px;

    display: flex;
    flex-direction: row;
    align-items: center;

    span {
      color: #fff;
      font-size: 18px;
      font-weight: 500;
      margin-left: 15px;
    }

    img {
      height: 30px;
    }
  }

  p {
    width: 100%;
    margin: 15px 0 30px;

    span {
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
    }

    a {
      font-size: 13px;
      color: ${props => props.theme.green};
    }
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
`;

const JoinBox: React.FC = () => {
  const [number, setNumber] = useState('');
  const [code, setCode] = useState('');

  const router = useRouter();

  const dispatch = useDispatch();
  const codeSent = useSelector(state => state.auth.codeSent);
  const loading = useSelector(state => state.auth.loading);

  const sendCode = useCallback(
    e => {
      e.preventDefault();

      dispatch(signRequest(number));
    },
    [number, dispatch],
  );

  const validateCode = useCallback(
    e => {
      e.preventDefault();

      dispatch(authenticateCodeRequest(code, router));
    },
    [code, dispatch, router],
  );

  return (
    <Container onSubmit={!codeSent ? sendCode : validateCode}>
      <p>
        <strong>Join </strong>
        <strong>KARMA</strong>
      </p>

      <section>
        <img src={smartphone} alt="smartphone" />
        <span> {!codeSent ? 'Login with phone number' : 'Enter code below'}</span>
      </section>

      {!codeSent ? (
        <PhoneInput placeholder="Enter number here" onChange={setNumber} />
      ) : (
        <CodeInput code={code} onChange={setCode} />
      )}

      <p>
        {!codeSent ? (
          <span>You will confirm a 6-digit code then your account will be created for you.</span>
        ) : (
          <>
            <span>Didn’t get a text? </span>
            <a rel="nofollow" href="someexternalurl">
              Send code again
            </a>
          </>
        )}
      </p>
      <SubmitButton
        loading={loading ? 1 : 0}
        background="green"
        disabled={!codeSent ? !number : code.length < 6}
        type="submit"
      >
        {!codeSent ? 'Send' : 'Confirm'}
      </SubmitButton>
    </Container>
  );
};

export default JoinBox;
