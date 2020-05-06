import React from 'react';

import { ModalProps } from '../../common/ModalWrapper';
import tip from '../../assets/tip.svg';

import Wrapper from './Wrapper';

interface Props extends ModalProps {
  wax?: number;
  eos?: number;
  liquidBalance?: number;
  onSubmit(value: number): void;
}

const TipModal: React.FC<Props> = props => {
  const handleSubmit = (value: number) => {
    props.onSubmit(value);
  };

  return <Wrapper icon={tip} entity="tip" handleSubmit={handleSubmit} {...props} />;
};

export default TipModal;
