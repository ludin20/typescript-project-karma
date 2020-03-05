import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';

import CreatePostModal from '../../post/CreatePostModal';

import activity from '../../assets/activity-white.svg';
import plus from '../../assets/plus.svg';

const Container = styled.div<Props>`
  min-width: 368px;
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

  button:nth-child(2),
  button:last-child {
    width: 180px;
    background: linear-gradient(270deg, #26cc8b 0%, #2adce8 100%) 0% 0%;
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 900;
    box-shadow: 0px 3px 25px #26cc8b80;
    border-radius: 90px;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    img {
      width: 26px;
      margin-right: 10px;
    }
  }

  @media (max-width: 1200px) {
    min-width: 300px;
  }

  @media (max-width: 1050px) {
    min-width: 180px;
    button:first-child {
      display: none;
    }
  }

  @media (max-width: 700px) {
    margin-right: 15px;
  }

  @media (max-width: 550px) {
    min-width: unset;

    button:nth-child(2) {
      display: none;
    }

    button:last-child {
      width: unset;
      padding: 10px 22px;
    }
  }

  @media (min-width: 550px) {
    button:last-child {
      display: none;
    }
  }

  ${props =>
    props.shouldHideCreatePost &&
    css`
      @media (max-width: 550px) {
        min-width: unset;

        button:nth-child(2),
        button:last-child {
          display: none;
        }
      }
    `}
`;

interface Props {
  shouldHideCreatePost?: boolean;
}

const Actions: React.FC<Props> = props => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Container {...props}>
        <button onClick={() => router.push('/activity')}>
          <img src={activity} alt="Activity" />
        </button>

        <button onClick={() => setOpen(true)}>
          <img src={plus} alt="create post" />
          Create Post
        </button>

        <button onClick={() => setOpen(true)}>
          <img src={plus} alt="create post" />
          Create
        </button>
      </Container>
      {open && <CreatePostModal open={open} close={() => setOpen(false)} />}
    </>
  );
};

export default Actions;
