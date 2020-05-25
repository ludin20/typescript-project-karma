import React from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import gridIcon from '../assets/grid.png';
import listIcon from '../assets/list.png';
import { viewFormTrue, viewFormFalse } from '../../store/ducks/action';

import { TabInterface } from './Tabs';

const Container = styled.div`
  padding-bottom: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

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

  strong {
    font-size: 30px;
    font-weight: 900;
    color: #fff;
  }

  div {
    display: flex;
  }
`;

const ContainerWithoutTitle = styled.div`
  width: 100%;
  margin: 30px 0 0 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;

  @media (max-width: 550px) {
    button {
      font-size: 18px;
    }
  }
`;

const Button = styled.button<{ active: boolean; withTitle?: boolean; size: 'default' | 'big' }>`
  background: none;
  color: ${props => (props.active ? '#fff' : 'rgba(255,255,255,0.4)')};
  font-size: ${props => (props.size === 'default' ? '20px' : '28px')};
  font-weight: 900;
  transition: color 0.2s;

  ${props =>
    props.withTitle &&
    css`
      & + button {
        margin-left: 15px;
      }
    `}
`;

const viewPortBtnCss = css`
  margin-left: 30px;
  width: 30px;
  height: 25px;
`;

interface Props {
  children: React.ReactChild;
  tabs?: TabInterface[];
  active: number;
  setActive: (index: number) => void;
  size: 'default' | 'big';
  viewForm?: boolean;
  isViewFormShow?: boolean;
}

const TabsHeader: React.FC<Props> = ({ children, tabs, active, setActive, size, viewForm, isViewFormShow }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const viewPortListButtonClicked = () => {
    dispatch(viewFormFalse());
  };

  const viewPortGridButtonClicked = () => {
    dispatch(viewFormTrue());
  };

  const handleClick = (tabName: string, index: number) => {
    pushToRoute(tabName);
    window.setTimeout(() => setActive(index), 500);
  };

  const pushToRoute = (tabName: string) => {
    const [_, route, secondParam, secondParamIsNotOldRoute] = router.asPath.split('/');
    const query = secondParamIsNotOldRoute ? `${secondParam}/` : '';

    const as = `/${route}/${query}${tabName}`;

    router.push(as);
  };

  return children ? (
    <Container>
      <strong>{children}</strong>
      <div>
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onClick={() => handleClick(tab.name.toLocaleLowerCase(), index)}
            active={active === index}
            withTitle
            size={size}
          >
            {tab.name}
          </Button>
        ))}
        {isViewFormShow && !viewForm && (
          <img src={gridIcon} alt="grid" onClick={viewPortGridButtonClicked} css={viewPortBtnCss} />
        )}
        {isViewFormShow && viewForm && (
          <img src={listIcon} alt="list" onClick={viewPortListButtonClicked} css={viewPortBtnCss} />
        )}
      </div>
    </Container>
  ) : (
    <ContainerWithoutTitle>
      {tabs.map((tab, index) => (
        <Button
          key={index}
          onClick={() => handleClick(tab.name.toLocaleLowerCase(), index)}
          active={active === index}
          size={size}
        >
          {tab.name}
        </Button>
      ))}
    </ContainerWithoutTitle>
  );
};

export default TabsHeader;
