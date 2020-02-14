import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Input from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

const Container = styled(Input)`
  background: ${props => (props.empty ? 'none' : props.theme.black)};
  padding: 0 10px;
  border: ${props => ` 1px solid ${props.theme.green}`};
  border-radius: 4px;
  transition: all 0.2s;

  .PhoneInputCountry {
    background: none;
    padding: 20px 5px;
    margin-right: 0;
  }

  .PhoneInputCountrySelectArrow {
    width: 8px;
    height: 8px;
    color: #fff;
    margin: 0 0 4px 10px;
    border-right-width: 2px;
    border-bottom-width: 2px;
    opacity: 1;
  }

  .PhoneInputInput {
    height: 100%;
    background: none;
    color: ${props => props.theme.white};
    font-size: 16px;
    margin-left: 10px;
    padding: 20px 0 20px 10px;
    border: none;
    border-left: ${props => ` 1px solid ${props.theme.green}`};

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;

interface Props {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
}

const PhoneInput: React.FC<Props> = ({ onChange, value, ...props }) => {
  const [empty, setEmpty] = useState(true);

  const setValue = useCallback(
    (value: string) => {
      if (!value) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }

      if (onChange) {
        onChange(value);
      }
    },
    [onChange],
  );

  return <Container empty={empty} defaultCountry="US" onChange={setValue} value={value} {...props} />;
};

export default PhoneInput;
