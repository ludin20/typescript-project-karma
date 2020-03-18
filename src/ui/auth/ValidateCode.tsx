import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store/ducks/rootReducer';
import { authenticateCodeRequest } from '../../store/ducks/auth';

import CodeInput from '../form/CodeInput';
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

const ValidateCode: React.FC = () => {
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const validateCode = useCallback(
    e => {
      e.preventDefault();

      dispatch(authenticateCodeRequest(code));
    },
    [code, dispatch],
  );

  return (
    <form onSubmit={validateCode}>
      <Column>
        <Row>
          <Title>Join </Title>
          <Space width={10} />
          <Title green>KARMA</Title>
        </Row>

        <JoinCard
          label="Enter code below"
          input={<CodeInput code={code} onChange={setCode} />}
          legend={
            <>
              <span>Didn’t get a text? </span>
              <a rel="nofollow" href="someexternalurl">
                Send code again
              </a>
            </>
          }
          submitText="Confirm"
          loading={loading}
          disabled={code.length < 6}
        />
      </Column>
    </form>
  );
};

export default ValidateCode;
