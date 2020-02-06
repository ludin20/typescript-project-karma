import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: ${props => props.theme.black};
  padding: 10px 30px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000026;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Number = styled.input`
  width: 37px;
  background: rgba(38, 204, 139, 0.2);
  padding: 7px 8px;
  border-radius: 8px;
  border: none;
  color: ${props => props.theme.green};
  font-size: 35px;
  text-align: center;

  & + input {
    margin-left: 10px;
  }

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

interface Props {
  code: string;
  onChange?: (value) => void;
}

const CodeInput: React.FC<Props> = ({ onChange }) => {
  const [internalCode, setInternalCode] = useState(['', '', '', '', '', '']);

  const inputRef0 = useRef();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();

  const inputRefs = useMemo(() => {
    return [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5];
  }, [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5]);

  const changeValue = useCallback(
    (value: string, index: number) => {
      const newCode = internalCode;
      newCode[index] = value.length < 2 ? value : value.charAt(0);

      setInternalCode(newCode);

      const codeString = internalCode.reduce((prev, next) => prev.concat(next), '');
      onChange && onChange(codeString);

      if (value === '') {
        if (inputRefs && index > 0) {
          inputRefs[index - 1].current.focus();
        }

        return;
      }

      if (inputRefs && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    },
    [inputRefs, internalCode, onChange],
  );

  return (
    <Container>
      <Number
        value={internalCode[0]}
        onChange={({ target }) => changeValue(target.value, 0)}
        ref={inputRef0}
        maxlength="1"
        type="number"
      />
      <Number
        value={internalCode[1]}
        onChange={({ target }) => changeValue(target.value, 1)}
        ref={inputRef1}
        maxlength="1"
        type="number"
      />
      <Number
        value={internalCode[2]}
        onChange={({ target }) => changeValue(target.value, 2)}
        ref={inputRef2}
        maxlength="1"
        type="number"
      />
      <Number
        value={internalCode[3]}
        onChange={({ target }) => changeValue(target.value, 3)}
        ref={inputRef3}
        maxlength="1"
        type="number"
      />
      <Number
        value={internalCode[4]}
        onChange={({ target }) => changeValue(target.value, 4)}
        ref={inputRef4}
        maxlength="1"
        type="number"
      />
      <Number
        value={internalCode[5]}
        onChange={({ target }) => changeValue(target.value, 5)}
        ref={inputRef5}
        maxlength="1"
        type="number"
      />
    </Container>
  );
};

export default CodeInput;
