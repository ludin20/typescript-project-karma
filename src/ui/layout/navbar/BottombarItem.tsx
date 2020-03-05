import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.button<{ selected: boolean }>`
  background: none;
  opacity: 0.4;

  img {
    height: 30px;
    width: 30px;
  }

  &:nth-child(5) {
    img {
      border-radius: 50%;
    }
  }

  ${props =>
    props.selected &&
    css`
      opacity: 1;
      position: relative;

      section {
        width: 1px;
        height: 1px;
        box-shadow: 0 0 50px 10px #26cc8b;
        border-radius: 50%;

        position: absolute;
        top: 50%;
        left: 12px;
      }
    `}
`;

interface Props {
  route?: string;
  selected: boolean;
  icon: string;
}

const BottombarItem: React.FC<Props> = ({ route, selected, icon, ...props }) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(route)} selected={selected} {...props}>
      <section />
      <img src={icon} alt="icon" />
    </Container>
  );
};

export default BottombarItem;
