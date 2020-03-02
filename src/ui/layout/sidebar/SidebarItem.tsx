import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

const Container = styled.button<{ selected: boolean }>`
  background: none;
  color: #fff;
  font-size: 18px;
  font-weight: 900;
  margin-top: 30px;
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
    }
  }

  img {
    height: 24px;
    width: 24px;
    margin-right: 20px;
  }

  &:nth-child(6) {
    img {
      border-radius: 50%;
    }
  }

  &:nth-child(8) {
    margin-top: 0px;
  }

  ${props =>
    props.selected &&
    css`
      opacity: 1;

      position: relative;

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
        <img src={icon} alt="icon" />
        <span>{children}</span>
      </div>
      {extraContent}
    </Container>
  );
};

export default SidebarItem;
