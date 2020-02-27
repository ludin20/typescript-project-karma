import React, { useState } from 'react';
import styled from 'styled-components';

import SendMoneyModal from '../../ui/SendMoneyModal/SendMoneyModal';
import SuccessModal from '../../ui/SendMoneyModal/SuccessModal';

import karma from '../../ui/assets/logo.png';
import wax from '../../assets/wax.png';

import Button from './Button';
import Token from './Token';

const Container = styled.div`
  width: 100%;
  background: ${props => props.theme.dark};
  padding: 40px 25px;
  border-radius: 40px 40px 0 0;

  header {
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;
  }

  > strong {
    color: #fff;
    font-size: 32px;
    font-weight: 900;
  }
`;

const Actions: React.FC = () => {
  const [sendMoneyModalIsOpen, setSendMoneyModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [value, setValue] = useState();
  const [to, setTo] = useState();

  const handleSubmit = (amount: number, to: string) => {
    setSendMoneyModalIsOpen(false);

    setValue(amount);
    setTo(to);

    setSuccessModalIsOpen(true);
  };

  return (
    <Container>
      <header>
        <Button actionType="Send" onClick={() => setSendMoneyModalIsOpen(true)} />
        <Button actionType="Power" />
        <Button actionType="Cool" />
        <Button actionType="Claim" />
      </header>

      <strong>Tokens</strong>
      <Token icon={karma} name="KARMA" unitValue="$0.00018" totalValue="$687.97" karmaValue="2,319,847" />
      <Token icon={wax} name="WAX" unitValue="$0.0235" totalValue="$3218.18" karmaValue="136,944" />

      {sendMoneyModalIsOpen && (
        <SendMoneyModal open close={() => setSendMoneyModalIsOpen(false)} handleSubmit={handleSubmit} />
      )}

      {successModalIsOpen && (
        <SuccessModal open close={() => setSuccessModalIsOpen(false)} karmaValue={value} usdValue={value} to={to} />
      )}
    </Container>
  );
};

export default Actions;
