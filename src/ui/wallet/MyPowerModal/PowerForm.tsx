import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';

import FormikInput from '../../form/FormikInput';
import Button from '../../common/Button';

import arrow from '../../assets/arrow-right.svg';
import Space from '../../common/Space';

const ConfirmButton = styled(Button)`
  font-size: 26px;
  height: 60px;
  width: 100%;
  font-weight: 900;
  box-shadow: 0px 3px 20px #00000029;
  border-radius: 50px;
  padding: 5px 0;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: relative;

  img {
    width: 90px;
    height: 90px;

    position: absolute;
    top: -13px;
    right: -15px;
  }
`;

const Input = styled(FormikInput)<{ focused: boolean; borderColor: string }>`
  min-height: 280px;
  padding: 100px 0;
  border-radius: 15px;

  input {
    font-weight: 500;
    font-size: 60px;
    text-align: center;
  }

  ${props =>
    props.focused &&
    css`
      border: ${`3px solid ${props.theme[props.borderColor]}`};
    `}
`;

interface Props {
  formik: FormikProps<any>;
  borderColor: string;
}

const PowerForm: React.FC<Props> = ({ formik, borderColor }) => {
  const [focused, setFocused] = useState(false);

  const { handleSubmit, isValid } = formik;

  return (
    <FormikProvider value={formik}>
      <Space height={30} />

      <form onSubmit={handleSubmit}>
        <Input
          borderColor={borderColor}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          focused={focused}
          name="power"
          placeholder="0 KARMA"
          background="black"
          numberOnly
        />
        <Space height={30} />

        <ConfirmButton type="submit" disabled={!isValid} background="green">
          Confirm
          <img src={arrow} alt="confirm" />
        </ConfirmButton>
      </form>
    </FormikProvider>
  );
};

export default PowerForm;
