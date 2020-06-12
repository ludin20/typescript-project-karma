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
  font-family: Montserrat, sans-serif !important;
  
  @media (max-width: 650px) {    
    padding: 20px 10px;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  strong {
    color: #fff;
    font-size: 26px;
    font-family: Montserrat,sans-serif;
    margin-left: 10px;
    position: relative;
    font-weight: 200;
    padding-bottom: 10px;

    &::after {
      content: '';
      width: 100px;
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
  font-weight: 400;
  height: 40px;
  line-height: 10px;
  font-size: 16px;
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
  font-size: 16px;
  font-weight: 600;
  background: #2adce8;
  margin-bottom: 20px;
  margin-top: 20px;
  height: 40px;
  line-height: 0px;
  strong {
    font-size: 32px;
  }
`;

interface LabelProps {
  green?: boolean;
  size?: string;
}

const Label = styled.strong<LabelProps>`
  font-weight: bold;
  font-size: ${props => (props.size === "small" ? '40px' : '60px')};
  font-family: Montserrat, sans-serif;
  color: ${props => (props.green ? props.theme.green : '#fff')};
  letter-spacing: 5px;

  @media (max-width: 1360px) {
    font-size: 40px;
  }
  @media (max-width: 650px) {
    font-size: 18px;
    letter-spacing: 2px;
  }
`;

const Content = styled.div`
`;

const Desc = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  strong:first-child {
    padding-right: 15px;
  }
`;

const Step = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;

  strong {
    font-size: 32px;
    letter-spacing: 2px;
  }
`;

const WaxActiveKey = styled.div`
  width: 560px;
  background: ${props => props.theme.dark};
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  border: 1px solid grey;
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
    font-size: 22px;
    color: #fff;
    font-weight: 400;
  }

  > div.digitcode {
    width: 50%;
    margin-left: 25%;
    text-align: center;

    input {
      margin: 0 5px;
      text-align: center;
      line-height: 60px;
      height: 50px;
      font-size: 16px;
      border: none;
      width: 12%;
      border-radius: 3px;
      background: #1b3e30;
      color: white;
      
      &:focus {
        border-color: purple;
        box-shadow: 0 0 5px purple inset;
      }
      
      &::selection {
        background: transparent;
      }
    }

    @media (max-width: 650px) {
      width: 100%;
      margin-left: 0px;
    }

    strong {
      background: none;
      color: rgba(255,255,255,0.4);
      font-size: 20px;
      font-weight: 400;
      margin-bottom: 20px;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
      position: relative;
    }
  }

  > p {
    font-size: 12px;
    color: #fff;
    font-weight: 200 !important;
    letter-spacing: 1px;
    line-height: 22px;
    span {
      color: #cb5d5e;
    }
  }
`;

const Input = styled(FormikInput)`
  border-radius: 0px;
  background: transparent;
  border-bottom: 2px solid #26cc8b;
  font-size: 18px;
  padding-left: 0px;
  padding-bottom: 16px;

  &::after {
    background: transparent !important;
  }

  input {
    font-size: 20px;
  }

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
  font-size: ${props => (props.active ? '20px' : '20px')};
  font-weight: 400;
  margin-bottom: 20px;
  transition: all 0.2s;  
  position: relative;

  &::after {
    background: transparent !important;
  }

  &:first-child {
    padding-right: 30px;
  }

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
          <div class="digitcode">
            <strong>Enter 6-Digit Text Code</strong>
            <Space height={20} />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />            
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
          </div>
          <Space height={20} />
          <ConfirmButton background="green" radius="rounded" onClick={() => { Router.push('/successtransfer') }}>
            Confirm
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
          <Label>  To New Account</Label>
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
                <Space height={50} />
                <Input label="" name="waxactivekey" placeholder="WAX Active Key" bordered />
                <Space height={30} />
                <ConfirmButton background="green" radius="rounded" onClick={() => setStep(2)}>
                  Confirm
                </ConfirmButton>
                <Space height={40} />
                <p>Before doing this, make sure you don't have any tokens in the account. This will NOT transfer any tokens for you. It will specifically tansfer your username, avatar, bio and content.
After doing this <span>we recommend changing your active private key.</span> </p>
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
