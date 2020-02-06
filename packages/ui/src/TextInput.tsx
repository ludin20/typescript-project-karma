import React, { useState, useCallback } from 'react';

import styled, { css } from 'styled-components';

const Container = styled.div<Props>`
  border-radius: 4px;
  background: ${props => props.theme.dark};
  padding: 10px 20px;
  transition: all 0.2s;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    span {
      font-size: 12px;
      color: ${props => props.theme.gray};
    }

    strong {
      font-size: 12px;
      color: ${props => props.theme.pink};
    }
  }

  input,
  textarea {
    background: none;
    color: ${props => props.theme.white};
    border: none;
    font-size: 15px;
    padding: 5px 0;
    -moz-appearance: textfield;

    resize: none;

    &::placeholder {
      color: ${props => props.theme.gray};
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
      border-bottom: ${props => (props.empty ? `4px solid ${props.theme.white}` : `4px solid ${props.theme.green}`)};
    `}

  ${props =>
    props.changeBackgroundOnEmpty &&
    css`
      background: ${props => (props.empty ? 'none' : props.theme.black)};
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
}

const TextInput: React.FC<Props> = ({ onChange, multiline, ...props }) => {
  const [empty, setEmpty] = useState(true);

  const setValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!e.target.value) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }

      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange],
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
          placeholder={props.placeholder}
          onChange={e => setValue(e)}
        />
      ) : (
        <textarea placeholder={props.placeholder} onChange={e => setValue(e)} rows={4} />
      )}
    </Container>
  );
};

export default TextInput;
