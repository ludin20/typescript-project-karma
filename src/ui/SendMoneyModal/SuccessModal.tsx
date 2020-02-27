import React from 'react';
import styled from 'styled-components';

import ModalWrapper, { ModalProps } from '../ModalWrapper';
import Button from '../Button';

import success from '../assets/tip.png';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${props => props.theme.dark};
  box-shadow: 0px 3px 20px #000000;
  border-radius: 25px;
  padding: 220px 0 80px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;

  > img {
    position: absolute;
    top: -100px;
    width: 250px;
    height: 250px;
  }

  span {
    color: ${props => props.theme.green};
    font-size: 22px;
    font-weight: bold;
  }

  p {
    display: flex;
    flex-direction: column;
    text-align: center;

    &:nth-child(2) {
      margin: 10px 0 37px;

      strong {
        color: #fff;
        font-size: 50px;
        font-weight: 900;
      }

      span {
        margin-top: 5px;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
      }
    }

    &:nth-child(3) {
      strong {
        color: #fff;
        font-size: 50px;
        font-weight: 900;
      }

      span + span {
        margin-top: 5px;
        color: #fff;
      }
    }
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  max-width: 500px;
  height: 75px;
  font-size: 18px;
  font-weight: 900;
  margin-top: 20px;
`;

interface Props extends ModalProps {
  to: string;
  karmaValue: string;
  usdValue: string;
}

const SuccessModal: React.FC<Props> = ({ to, karmaValue, usdValue, ...props }) => {
  return (
    <ModalWrapper {...props}>
      <Container>
        {/* <img src={success} alt="confirmation" /> */}

        <span>Successfully sent!</span>

        <p>
          <strong>{karmaValue} KARMA</strong>
          <span>{usdValue} USD</span>
        </p>

        <p>
          <span>Recipients address:</span>
          <span>{to}</span>
        </p>
      </Container>

      <SubmitButton background="green" radius="rounded" onClick={props.close}>
        Done
      </SubmitButton>
    </ModalWrapper>
  );
};

export default SuccessModal;
