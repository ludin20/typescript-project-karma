import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'found';

import activity from '../../assets/activity-white.svg';

const Container = styled.div`
  display: flex;
  flex-direction: row;

  button:first-child {
    background: none;
    margin-right: 40px;

    position: relative;

    img {
      width: 30px;
      height: 30px;
    }

    &:after {
      content: '';
      width: 8px;
      height: 8px;
      background: ${props => props.theme.warning};
      border-radius: 50%;

      position: absolute;
      top: 2px;
      right: -10px;
    }
  }

  button:last-child {
    width: 180px;
    background: linear-gradient(270deg, #26cc8b 0%, #2adce8 100%) 0% 0%;
    color: #fff;
    padding: 10px 15px;
    font-size: 18px;
    font-weight: bold;
    box-shadow: 0px 3px 25px #26cc8b80;
    border-radius: 90px;

    display: flex;
    align-items: center;

    div {
      width: 20px;
      height: 20px;
      background: #ffffff66;
      border: 1px solid #ffffff;
      margin-right: 10px;
      border-radius: 8px;
    }
  }
`;

const Actions: React.FC = () => {
  const { router } = useRouter();

  return (
    <Container>
      <button onClick={() => router.push('/activity')}>
        <img src={activity} alt="Activity" />
      </button>

      <button>
        <div></div>
        Create Post
      </button>
    </Container>
  );
};

export default Actions;
