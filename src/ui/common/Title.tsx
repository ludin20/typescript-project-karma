import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import arrow from '../assets/arrow.svg';

import Text from './Text';
import Row from './Row';
import Space from './Space';

const Container = styled(Row).attrs({
  align: 'center',
})<Props>`
  ${props =>
    props.bordered &&
    css`
      padding-bottom: 10px;
      position: relative;

      &::after {
        content: '';
        width: 60px;
        height: 6px;
        background: linear-gradient(90deg, #2adce8 0%, #29db95 100%);
        border-radius: 5px;

        position: absolute;
        bottom: 0;
      }
    `}
`;

const Image = styled.img<{ toogled?: boolean }>`
  width: 14px;
  transition: transform 0.2s;
  transform: ${props => props.toogled && 'rotate(-90deg)'};
`;

const hiddenHeader = css`
  @media (max-width: 700px) {
    display: none;
  }
`;

interface Props {
  withDropDown?: boolean;
  bordered?: boolean;
  size?: 'default' | 'small';
  shouldHideHeader?: boolean;
  color?: string;
}

const Title: React.FC<Props> = ({ children, withDropDown, bordered = true, size = 'default', shouldHideHeader, color }) => {
  const [toogled, setToogled] = useState(false);

  return (
    <Container bordered={bordered} size={size} css={shouldHideHeader ? hiddenHeader : undefined}>
      <Text size={size === 'default' ? 34 : 30} weight="900" color={color ? color : "white"}>
        {children}
      </Text>
      {withDropDown && (
        <>
          <Space width={10} />
          <Row onClick={() => setToogled(!toogled)} align="center" justify="center">
            <Image src={arrow} alt="toogle" toogled={toogled} />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Title;
