import React, { useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useField, useFormikContext } from 'formik';

const Container = styled.div<Props>`
  border-radius: 4px;
  background: ${props => props.theme.black};
  padding: 10px 20px;
  transition: all 0.2s;

  display: flex;
  flex-direction: column;

  header {
    margin-bottom: 4px;

    display: flex;
    justify-content: space-between;

    position: relative;

    span {
      font-size: 13px;
      font-weight: 300;
      color: rgba(255, 255, 255, 0.4);
    }

    strong {
      font-size: 16px;
      color: ${props => props.theme.pink};
      position: absolute;
      top: 5px;
      right: 0;
    }
  }

  input,
  textarea {
    background: none;
    color: ${props => props.theme.white};
    border: none;
    font-size: 20px;
    padding: 8px 0;

    flex: 1;

    -moz-appearance: textfield;

    resize: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  ${props =>
    props.bordered &&
    css`
      border-radius: 15px 15px 0 0;

      position: relative;

      &::after {
        content: '';
        height: 3px;
        width: 99.8%;
        background: ${props.empty ? props.theme.white : props.theme.green};
        transition: all 0.1s;

        border-radius: 0px 0px 15px 15px;

        position: absolute;
        bottom: 0;
        left: 0;
      }
    `}

  ${props =>
    props.changeBackgroundOnEmpty &&
    css`
      background: ${props.empty ? 'none' : props.theme.black};
    `}
`;

export interface Props {
  required?: boolean;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  bordered?: boolean;
  onChange?: (value: string) => void;
  changeBackgroundOnEmpty?: boolean;
  numberOnly?: boolean;
  mask?: string;
  empty?: boolean;
  name?: string;
  dark?: boolean;
}

const FormikInput: React.FC<Props> = ({ onChange, multiline, mask, name, ...props }) => {
  const [empty, setEmpty] = useState(true);
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    if (field.value) setEmpty(false);
  }, []); //eslint-disable-line

  const setValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!e.target.value) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }

      if (mask) {
        const [firstValue, secondValue] = e.target.value.split(mask);

        const valueWithOutMask = `${secondValue ? secondValue : !!firstValue && firstValue !== mask ? firstValue : ''}`;
        const value = valueWithOutMask ? `${mask}${valueWithOutMask}` : '';

        if (!valueWithOutMask) setEmpty(true);

        if (onChange) {
          onChange(value);
        }

        return setFieldValue(name, value);
      }

      if (onChange) {
        onChange(e.target.value);
      }

      return setFieldValue(name, e.target.value);
    },
    [mask, name, onChange, setFieldValue],
  );

  return (
    <Container empty={empty} {...props}>
      {props.label && (
        <header>
          <span>{props.label}</span>
          {props.required && <strong>*</strong>}
        </header>
      )}
      {!multiline ? (
        <input
          type={!props.numberOnly ? 'text' : 'number'}
          placeholder={props.placeholder || mask}
          onChange={e => setValue(e)}
          name={name}
          value={field.value}
        />
      ) : (
        <textarea placeholder={props.placeholder || mask} onChange={e => setValue(e)} rows={3} name={name} />
      )}
    </Container>
  );
};

export default FormikInput;
