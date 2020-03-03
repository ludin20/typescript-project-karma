import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.button<{ selected: boolean }>`
  background: none;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  margin-top: 40px;
  padding-right: 20px;
  opacity: 0.4;
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;

    span {
      margin-top: 5px;
      margin-left: 20px;
    }
  }

  img {
    height: 24px;
    width: 24px;
  }

  &:nth-child(5) {
    img {
      border-radius: 50%;
    }
  }

  &:nth-child(7) {
    margin-top: 0px;
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

      &::after {
        content: '';
        width: 3px;
        height: 100%;
        background: ${props.theme.green};
        border-radius: 4px;

        position: absolute;
        right: 0;
        top: 0;
      }
    `}
`;

interface Props {
  route?: string;
  onClick?(): void;
  selected: boolean;
  icon: string;
  extraContent?: React.ReactNode;
}

const SidebarItem: React.FC<Props> = ({ onClick, children, route, selected, icon, extraContent, ...props }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    } else {
      router.push(route);
    }
  }, [onClick, route, router]);

  return (
    <Container onClick={handleClick} selected={selected} {...props}>
      <div>
        <section />
        <img src={icon} alt="icon" />

        <span>{children}</span>
      </div>
      {extraContent}
    </Container>
  );
};

export default SidebarItem;
