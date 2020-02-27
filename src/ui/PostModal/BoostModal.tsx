import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalProps } from '../ModalWrapper';

import rocket from '../assets/rocket.svg';
import karma from '../assets/logo.png';
import wax from '../../assets/wax.png';

import Wrapper from './Wrapper';

const Header = styled.section`
  width: 100%;
  margin-bottom: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  > img {
    width: 47px;
    height: 47px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    position: absolute;
    right: 0;
  }
`;

const TypeOfBoost = styled.button<{ active: boolean }>`
  background: none;
  opacity: ${props => (props.active ? 1 : 0.4)};
  transition: all 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  & + button {
    margin-left: 10px;
  }

  img {
    height: ${props => (props.active ? '30px' : '25px')};
    transition: transform 0.2s;
  }
`;

const BoostModal: React.FC<ModalProps> = props => {
  const [typeOfBoost, setTypeOfBoost] = useState<'KARMA' | 'WAX'>('KARMA');

  const handleSubmit = (value: number) => {
    console.log(value); //eslint-disable-line no-console
  };

  const customHeader: React.FC = () => {
    return (
      <Header>
        <img src={rocket} alt="boost" />

        <div>
          <TypeOfBoost active={typeOfBoost === 'KARMA'} onClick={() => setTypeOfBoost('KARMA')}>
            <img src={karma} alt="karma" />
          </TypeOfBoost>

          <TypeOfBoost active={typeOfBoost === 'WAX'} onClick={() => setTypeOfBoost('WAX')}>
            <img src={wax} alt="wax" />
          </TypeOfBoost>
        </div>
      </Header>
    );
  };

  return (
    <Wrapper
      icon={rocket}
      entity="boost"
      handleSubmit={handleSubmit}
      customHeader={customHeader}
      {...props}
      method={typeOfBoost}
    />
  );
};

export default BoostModal;
