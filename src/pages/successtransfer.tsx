import React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';

import success from '../ui/assets/success.svg';
import nextCookie from 'next-cookies';
import Router, { useRouter } from 'next/router';

import { labels } from '../ui/layout';

import { KARMA_SESS } from '../common/config';
import TransferContent from '../ui/auth/TransferContent';

const SuccessWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 550px) {
    padding: 0 15px;
  }
`;

const SuccessIcon = styled.img`
  position: absolute;
  z-index: 2;
  top: 85px;
  width: 450px;
  height: 450px;
`;

const Label = styled.div`
    position: absolute;
    top: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
        margin-top: 10px;
        font-size: 70px;
        color: #fff;
        font-weight: 700;
        letter-spacing: 3px;
        font-family: sans-serif;

        @media (max-width: 650px) {
          font-size: 40px;
        }
    }
`;

const TransferContentAuth: NextPage = () => {
  const router = useRouter();

  return (
    <SuccessWrapper>
        <SuccessIcon src={success} alt="confirmation" />
        <Label>
            <p>Content Transfer</p>
            <p>Was Successful</p>
        </Label>
    </SuccessWrapper>
  );
};

export default TransferContentAuth;
