import React, { useCallback, useRef, useState } from 'react';
import InputMask from 'react-input-mask';
import styled from 'styled-components';
import { useFormikContext } from 'formik';

const Container = styled.div`
  background: ${props => props.theme.black};
  padding: 10px 30px;
  border-radius: 8px;
  box-shadow: 0px 3px 6px #00000026;

  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Number = styled(InputMask).attrs({
  mask: `9`,
  maskPlaceholder: null,
})`
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
`;

interface Props {
  name: string;
}

const CodeInput: React.FC<Props> = ({ name }) => {
  const [internalCode, setInternalCode] = useState(['', '', '', '', '', '']);
  const { setFieldValue } = useFormikContext<any>();

  const inputRef0 = useRef();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();

  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4, inputRef5];

  const handleChangeInputBox = useCallback(
    (value: string, index: number) => {
      if (!inputRefs) return;

      const targetRef = value ? inputRefs[index + 1] : inputRefs[index - 1];
      if (!targetRef) return;

      if ((!value && index > 0) || (value && index < 5)) {
        // @ts-ignore
        targetRef.current.focus();
      }
    },
    [inputRefs],
  );

  const handleChange = useCallback(
    (value: string, index: number) => {
      const newCode = internalCode;
      newCode[index] = value.length < 2 ? value : value.charAt(0);
      setInternalCode(newCode);

      const codeString = internalCode.reduce((prev, next) => prev.concat(next), '');
      setFieldValue(name, codeString);

      handleChangeInputBox(value, index);
    },
    [internalCode, setFieldValue, name, handleChangeInputBox],
  );

  /* const handleKeyDown = useCallback(
    (key: string, index: number) => {
      if (key !== 'Backspace' || internalCode[index] !== '') return;

      handleChange('', index);
    },
    [handleChange, internalCode],
  ); */

  return (
    <Container>
      <Number
        value={internalCode[0]}
        //onKeyDown={({ key }) => handleKeyDown(key, 0)}
        onChange={({ target }) => handleChange(target.value, 0)}
        ref={inputRef0}
      />
      <Number
        value={internalCode[1]}
        //onKeyDown={({ key }) => handleKeyDown(key, 1)}
        onChange={({ target }) => handleChange(target.value, 1)}
        ref={inputRef1}
      />
      <Number
        value={internalCode[2]}
        //onKeyDown={({ key }) => handleKeyDown(key, 2)}
        onChange={({ target }) => handleChange(target.value, 2)}
        ref={inputRef2}
      />
      <Number
        value={internalCode[3]}
        //onKeyDown={({ key }) => handleKeyDown(key, 3)}
        onChange={({ target }) => handleChange(target.value, 3)}
        ref={inputRef3}
      />
      <Number
        value={internalCode[4]}
        //onKeyDown={({ key }) => handleKeyDown(key, 4)}
        onChange={({ target }) => handleChange(target.value, 4)}
        ref={inputRef4}
      />
      <Number
        value={internalCode[5]}
        //onKeyDown={({ key }) => handleKeyDown(key, 5)}
        onChange={({ target }) => handleChange(target.value, 5)}
        ref={inputRef5}
      />
    </Container>
  );
};

export default CodeInput;
