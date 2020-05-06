import React, { useState } from 'react';
import styled from 'styled-components';

import ModalWrapper, { ModalProps } from '../../common/ModalWrapper';
import Button from '../../common/Button';

import ChangeValue from './ChangeValue';
import Slider from './Slider';
import ValueCards from './ValueCards';

const Container = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${props => props.theme.dark};
  transform: translateY(25%);
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

interface WrapperProps extends ModalProps {
  icon: string;
  entity: string;
  wax?: number;
  eos?: number;
  liquidBalance?: number;
  handleSubmit(value: number): void;
  customHeader?: React.FC;
  method?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ icon, entity, customHeader: CustomHeader, method = 'KARMA', handleSubmit, ...props }) => {
  const [value, setTipValue] = useState(0);

  return (
    <ModalWrapper {...props}>
      <Container>
        {CustomHeader ? <CustomHeader /> : <img src={icon} alt={entity} />}
        <p>
          <span>How much do you want to </span>
          <span>{entity}</span>
          <span>?</span>
        </p>

        <ChangeValue value={value} onChange={setTipValue} method={method} wax={props.wax} eos={props.eos} liquidBalance={props.liquidBalance} />
        <Slider value={value} max={props.liquidBalance} onChange={setTipValue} />
        <ValueCards onChange={setTipValue} />

        <SubmitButton background="green" disabled={!value || value < 1} type="button" radius="rounded" onClick={() => handleSubmit(value)}>
          Confirm
        </SubmitButton>
      </Container>
    </ModalWrapper>
  );
};

export default Wrapper;
