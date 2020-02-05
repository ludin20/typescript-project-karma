import React, { useState, useCallback } from 'react';

import styled from 'styled-components';

const Container = styled.div<Props>`
  border-radius: 4px;
  background: ${props => props.theme.dark};
  padding: 10px 20px;
  border-bottom: ${props => (props.empty ? `4px solid ${props.theme.white}` : `4px solid ${props.theme.green}`)};
  transition: border-bottom 0.2s;

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
    font-size: 20px;

    resize: none;

    &::placeholder {
      color: ${props => props.theme.gray};
    }
  }
`;

interface Props {
  required?: boolean;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  onChange?: (value: string) => void;
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
      <header>
        <span>{props.label}</span>
        {props.required && <strong>*</strong>}
      </header>
      {!multiline ? (
        <input type="text" placeholder={props.placeholder} onChange={e => setValue(e)} />
      ) : (
        <textarea placeholder={props.placeholder} onChange={e => setValue(e)} rows={4} />
      )}
    </Container>
  );
};

export default TextInput;
