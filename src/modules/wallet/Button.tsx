import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

import send from '../../assets/send.svg';
import power from '../../assets/power.svg';
import cool from '../../assets/cool.svg';
import claim from '../../assets/claim.svg';

const Container = styled.button<Props>`
  font-size: 20px;
  font-weight: 900;
  padding: 10px 20px;
  border-radius: 50px;
  transition: opacity 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;


  &:hover {
    opacity: 0.8;
  }

  & + button {
    margin-left: 10px;
  }
  
  img {
    height: 25px;
    margin-right: 10px;
  }

  ${props =>
    props.actionType === 'Send' &&
    css`
      background: #ffe7c7;
      color: #d88008;
    `}

  ${props =>
    props.actionType === 'Power' &&
    css`
      background: #ffc7cf;
      color: #f23334;
    `}

  ${props =>
    props.actionType === 'Cool' &&
    css`
      background: #c7f0ff;
      color: #339af2;
    `}

  ${props =>
    props.actionType === 'Claim' &&
    css`
      background: #c7ffe9;
      color: #26cc8b;
    `}
`;

interface Props {
  actionType: 'Send' | 'Power' | 'Cool' | 'Claim';
}

const Button: React.FC<Props> = ({ actionType, ...props }) => {
  const image = useMemo(() => {
    switch (actionType) {
      case 'Send':
        return send;
      case 'Power':
        return power;
      case 'Cool':
        return cool;

      case 'Claim':
        return claim;
      default:
        return '';
    }
  }, [actionType]);

  return (
    <Container {...props} actionType={actionType}>
      <img src={image} alt={actionType} />
      {actionType}
    </Container>
  );
};

export default Button;
