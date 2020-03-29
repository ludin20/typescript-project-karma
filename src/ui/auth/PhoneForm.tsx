import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/ducks/rootReducer';
import { signRequest } from '../../store/ducks/auth';

import PhoneInput from '../form/PhoneInput';
import Column from '../common/Column';
import Row from '../common/Row';
import Space from '../common/Space';

import JoinCard from './JoinCard';

interface TitleProps {
  green?: boolean;
}
const Title = styled.p<TitleProps>`
  color: ${props => (props.green ? props.theme.green : '#fff')};
  font-size: 40px;
  font-weight: 900;
  text-align: center;
`;

const PhoneForm: React.FC = () => {
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const sendCode = useCallback(
    e => {
      e.preventDefault();

      dispatch(signRequest(number));
    },
    [number, dispatch],
  );

  return (
    <form onSubmit={sendCode}>
      <Column>
        <Row justify="center">
          <Title>Join </Title>
          <Space width={10} />
          <Title green>KARMA</Title>
        </Row>

        <JoinCard
          label="Login with phone number"
          input={<PhoneInput placeholder="Enter number here" onChange={setNumber} value={number} />}
          legend="You will confirm a 6-digit code then your account will be created for you."
          submitText="Send"
          loading={loading}
          disabled={!number}
        />
      </Column>
    </form>
  );
};

export default PhoneForm;
