import React from 'react';

import { ModalProps } from '../../common/ModalWrapper';
import tip from '../../assets/tip.svg';

import Wrapper from './Wrapper';

const TipModal: React.FC<ModalProps> = props => {
  const handleSubmit = (value: number) => {
    console.log(value); //eslint-disable-line no-console
  };

  return <Wrapper icon={tip} entity="tip" handleSubmit={handleSubmit} {...props} />;
};

export default TipModal;
