import React, { useState } from 'react';
import styled from 'styled-components';

import ModalWrapper, { ModalProps } from '../ModalWrapper';
import Button from '../Button';

import tip from '../assets/tip.png';

import ChangeTipValue from './ChangeTipValue';
import Slider from './Slider';
import TipCards from './TipCards';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.dark};
  border-radius: 25px;
  padding: 20px 40px;
  box-shadow: 0px 3px 20px #000000;

  display: flex;
  flex-direction: column;
  align-items: center;

  > img {
    width: 47px;
    height: 47px;
    margin-bottom: 20px;
  }

  span {
    font-size: 18px;
    font-weight: 900;
    color: #fff;
  }

  p > span:nth-child(2) {
    color: ${props => props.theme.green};
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 900;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TipModal: React.FC<ModalProps> = props => {
  const [tipValue, setTipValue] = useState(0);

  return (
    <ModalWrapper {...props}>
      <Container>
        <img src={tip} alt="tip" />
        <p>
          <span>How much do you want to </span>
          <span>tip</span>
          <span>?</span>
        </p>

        <ChangeTipValue tipValue={tipValue} changeValue={setTipValue} />
        <Slider tipValue={tipValue} changeValue={setTipValue} />
        <TipCards changeValue={setTipValue} />

        <SubmitButton background="green" disabled={tipValue <= 0} type="button" radius="rounded">
          Confirm
        </SubmitButton>
      </Container>
    </ModalWrapper>
  );
};

export default TipModal;
