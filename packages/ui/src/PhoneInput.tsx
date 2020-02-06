import React from 'react';
import styled from 'styled-components';

import TextInput, { Props as InputProps } from './TextInput';

const Container = styled(TextInput)`
  border: ${props => ` 1px solid ${props.theme.green}`};
`;

const PhoneInput: React.FC<InputProps> = props => {
  return <Container bordered={false} changeBackgroundOnEmpty numberOnly {...props}></Container>;
};

export default PhoneInput;
