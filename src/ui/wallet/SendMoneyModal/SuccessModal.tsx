import React from 'react';
import styled from 'styled-components';

import ModalWrapper, { ModalProps } from '../../common/ModalWrapper';
import Button from '../../common/Button';

import success from '../../assets/success.svg';

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

const Container = styled.div`
  margin-top: 90px;
  width: 100%;
  max-width: 500px;
  background: ${props => props.theme.dark};
  box-shadow: 0px 3px 20px #000000;
  border-radius: 25px;
  padding: 285px 0 35px;

  display: flex;
  flex-direction: column;
  align-items: center;

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
      width: 80%;

      strong {
        color: #fff;
        font-size: 50px;
        font-weight: 900;
      }

      span + span {
        margin-top: 5px;
        color: #fff;
      }

      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
`;

const SuccessIcon = styled.img`
  position: absolute;
  z-index: 2;
  top: 85px;
  width: 300px;
  height: 300px;
`;

const SubmitButton = styled(Button)`
  width: 100% !important;
  max-width: 500px;
  height: 75px;
  font-size: 18px;
  font-weight: 900;
  margin-top: 20px;
  z-index: 2;
`;

interface Props extends ModalProps {
  to: string;
  value: {
    karma: number;
    usd: number;
  };
  action: string;
}

const SuccessModal: React.FC<Props> = ({ to, value, action, ...props }) => {
  return (
    <ModalWrapper {...props} justify="center">
      <SuccessWrapper>
        <SuccessIcon src={success} alt="confirmation" />

        <Container>
          <span>Successfully {action == 'send' ? 'sent' : 'claimed'}!</span>

          <p>
            <strong>{value.karma.toFixed()} KARMA</strong>
            <span>{value.usd.toFixed(2)} USD</span>
          </p>

          <p>
            <span>{action == 'send' ? 'Recipients address:' : 'View Transaction'}</span>
            <span>{to}</span>
          </p>
        </Container>

        <SubmitButton background="green" radius="rounded" onClick={props.close}>
          Done
        </SubmitButton>
      </SuccessWrapper>
    </ModalWrapper>
  );
};

export default SuccessModal;
