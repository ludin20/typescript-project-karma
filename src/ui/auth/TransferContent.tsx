import React, { useState } from 'react';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { FormikProvider, FormikProps, useFormik } from 'formik';

import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';

import karmas from '../assets/karmas.png';
import Column from '../common/Column';
import FormikInput from '../form/FormikInput';
import PhoneInput from '../form/PhoneInput';

const Container = styled.div`
  padding: 50px 75px;
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  strong {
    color: #fff;
    font-size: 30px;
    font-family: Montserrat, sans-serif;
    margin-left: 10px;
    position: relative;

    &::after {
      content: '';
      width: 120px;
      height: 6px;
      background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
      border-radius: 5px;
  
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }

  > img {
    width: 50px;
    height: 50px;
  }
`

const Legend = styled.p`
  width: 100%;

  &:first-child {
    margin: 0 0 10px;
    text-align: center;
  }
`;

const ConfirmButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
`;

const WaxCloudButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
  background: #ff8b1c;
`;

const ScatterButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
  background: #009AFF;
`;

interface LabelProps {
  green?: boolean;
  size?: string;
}

const Label = styled.strong<LabelProps>`
  font-weight: bold;
  font-size: ${props => (props.size === "small" ? '30px' : '50px')};
  font-family: Montserrat, sans-serif;
  color: ${props => (props.green ? props.theme.green : '#fff')};
`;

const Content = styled.div`
`;

const Desc = styled.div`
  display: flex;
  justify-content: center;
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
`;

const WaxActiveKey = styled.div`
  width: 600px;
  background: ${props => props.theme.dark};
  padding: 50px 30px;
  box-shadow: 0px 3px 20px #0000004d;
  border-radius: 25px;

  position: relative;
  z-index: 200;

  @media (max-width: 650px) {
    height: 100%;
    width: 100%;
    border-radius: 0;
  }

  > strong {
    font-size: 24px;
    color: #fff;
  }

  > p {
    font-size: 18px;
    color: #fff;
  }
`;

const Input = styled(FormikInput)`
  border-radius: 4px;
  @media (max-width: 700px) {
    padding: 10px 14px;

    header > span {
      font-size: 13px;
    }

    input,
    textarea {
      font-size: 18px;
    }
  }
`;

const TabButton = styled.button<{ active: boolean; decrease: boolean }>`
  background: none;
  color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.4)')};
  font-size: ${props => (props.active ? '28px' : '24px')};
  font-weight: 900;
  transition: all 0.2s;

  position: relative;

  ${props =>
    props.active &&
    css`
      &::after {
        content: '';
        width: 105px;
        height: 4px;
        background: ${props.decrease ? '#EB6465' : props.theme.green};
        border-radius: 5px;

        position: absolute;
        bottom: -5px;
        left: 0;
      }
    `}

  @media(max-width: 700px) {
    font-size: 18px;
  }
`;

interface Props {
}

const TransferContent: React.FC<Props> = () => {
  const [step, setStep] = useState(1);
  const [sendCode, setSendCode] = useState(false);
  
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      number: '',
    },
    validateOnMount: true,
    onSubmit: ({ number }) => {
      console.log('Send Code')
      // dispatch(signRequest(number));
    },
  });

  const tabs = [
    {
      name: 'Phone Number',
      render: () => (!sendCode ? <>
          <Space height={20} />
          <PhoneInput placeholder="Enter number here" name="number" />
          <Space height={20} />
          <ScatterButton onClick={() => { console.log('Send Code'); setSendCode(true); }}>
            Send Code
          </ScatterButton>
        </> : <>
          <Space height={20} />
          <strong>Enter 6-Digit Text Code</strong>
          <Space height={20} />
          <Input label="" name="waxactivekey" placeholder="6-Digit Text Code" bordered />
          <Space height={20} />
          <ConfirmButton background="green" radius="rounded" onClick={() => { Router.push('/successtransfer') }}>
            Send Code
          </ConfirmButton>
        </>
      ),
      active: true
    },
    {
      name: 'Wax Cloud Wallet',
      render: () => (<p>A</p>),
    },
  ];

  return (
    <Container>
      <Header>
        <img src={karmas} alt="Karma" />
        <strong>KARMA</strong>
      </Header>
      <Content>
        <Space height={20} />
        <Desc>
          <Label green>Transfer Content </Label>
          <Label>To New Account</Label>
        </Desc>
        <Space height={20} />
        <Step>
          <Label size="small">Step {step}</Label>
        </Step>
        {
          step == 1 ? (<Column align="center" justify="center">
            <FormikProvider value={formik}>
              <WaxActiveKey>
                <strong>Enter private key for existing account</strong>
                <Space height={20} />
                <Input label="" name="waxactivekey" placeholder="WAX Active Key" bordered />
                <Space height={20} />
                <ConfirmButton background="green" radius="rounded" onClick={() => setStep(2)}>
                  Confirm
                </ConfirmButton>
                <Space height={20} />
                <p>Before doing this, make sure you don't have any tokens in the account. This will NOT transfer any tokens for you. It will specifically tansfer your username, avatar, bio and content.
After doing this we recommend changing your active private key.</p>
              </WaxActiveKey>
            </FormikProvider>
          </Column>)
          : (step == 2 ? (<Column align="center" justify="center">
          <FormikProvider value={formik}>
            <WaxActiveKey>
              {tabs.map((tab, index) => (
                <React.Fragment key={index}>
                  <TabButton decrease={index > 0} onClick={() => {console.log('Next Tab')}} active={tab.active}>
                    {tab.name}
                  </TabButton>
                </React.Fragment>
              ))}
              {tabs[tabs.findIndex(tab => tab.active)].render({})}
            </WaxActiveKey>
          </FormikProvider>
        </Column>) : <></>)
        }
      </Content>
    </Container>
  );
};

export default TransferContent;
