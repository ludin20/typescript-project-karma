import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { CreatePostModal } from '../index';

import activity from '../assets/activity-white.svg';
import plus from '../assets/plus.svg';

const Container = styled.div`
  min-width: 360px;
  margin-right: 30px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;

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
    width: 160px;
    background: linear-gradient(270deg, #26cc8b 0%, #2adce8 100%) 0% 0%;
    color: #fff;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 900;
    box-shadow: 0px 3px 25px #26cc8b80;
    border-radius: 90px;

    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
`;

const Actions: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Container>
        <button onClick={() => router.push('/activity')}>
          <img src={activity} alt="Activity" />
        </button>

        <button onClick={() => setOpen(true)}>
          <img src={plus} alt="create post" />
          Create Post
        </button>
      </Container>
      {open && <CreatePostModal open={open} close={() => setOpen(false)} />}
    </>
  );
};

export default Actions;
