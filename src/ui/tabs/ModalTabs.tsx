import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import Space from '../common/Space';

const Header = styled.div`
  width: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const Button = styled.button<{ active: boolean; decrease: boolean }>`
  background: none;
  color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.4)')};
  font-size: ${props => (props.active ? '28px' : '24px')};
  font-weight: 900;
  transition: all 0.2s;

  position: relative;

  ${props =>
    props.active &&
    css`
      &::after {
        content: '';
        width: 105px;
        height: 4px;
        background: ${props.decrease ? '#EB6465' : props.theme.green};
        border-radius: 5px;

        position: absolute;
        bottom: -5px;
        left: 0;
      }
    `}

  @media(max-width: 700px) {
    font-size: 18px;
  }
`;

const SpaceOnMobile = css`
  @media (max-width: 700px) {
    width: 36px;
  }
`;

export interface TabInterface {
  name: string;
  action: string;
  active: boolean;
  render: React.FC;
}

interface Props {
  tabs: TabInterface[];
  onChangeTab(action: string): void;
}

const Tabs: React.FC<Props> = ({ tabs, onChangeTab }) => {
  return (
    <>
      <Header>
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <Button decrease={index > 0} onClick={() => onChangeTab(tab.action)} active={tab.active}>
              {tab.name}
            </Button>
            {tabs.length - 1 !== index && <Space width={50} css={SpaceOnMobile} />}
          </React.Fragment>
        ))}
      </Header>

      <Space height={30} />
      {tabs[tabs.findIndex(tab => tab.active)].render({})}
    </>
  );
};

export default Tabs;
