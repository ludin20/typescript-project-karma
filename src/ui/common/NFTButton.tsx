import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

import Button from './Button';
import { KARMA_AUTHOR, REQUEST_JWT } from '../../common/config';
import { follow } from '../../services/config';
import { RootState } from '../../../store/ducks/rootReducer';

const Container = styled(Button)<Props>`
  background: #20252E !important;
  box-shadow: none !important;
  border: 1px solid #26CC8B !important;
  width: 200px !important;
  font-size: 14px !important;
  margin-top: 5px;
  margin-bottom: 5px;

  &:hover {
    opacity: 0.8;
  }
`;

interface Props {
}

const NFTButton: React.FC<Props> = ({  }) => {
  const { profile } = useSelector((state: RootState) => state.user);
  const { liquidBalance } = profile;
  return (
    <Container>{liquidBalance ? Math.floor(liquidBalance) : 0} Million KARMA</Container>
  );
};

export default NFTButton;
