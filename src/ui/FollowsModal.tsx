import React from 'react';
import styled from 'styled-components';

import close from './assets/close.svg';

import ModalWrapper from './ModalWrapper';

import Title from './Title';
import FollowCard from './FollowCard';

const Container = styled.div`
  width: 100%;
  max-width: 700px;
  background: linear-gradient(90deg, #20252e 0%, #191a19 100%);
  border-radius: 50px 50px 0 0;
  padding: 30px 40px 40px;

  header {
    margin-bottom: 30px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: none;

      img {
        width: 25px;
        height: 25px;
      }
    }
  }
`;

const SeeMore = styled.button`
  width: 100%;
  max-width: 700px;
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  padding: 18px 0;
  border-radius: 0px 0px 50px 50px;

  box-shadow: 0px 3px 6px #00000029;
`;

interface Props {
  data: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    following: boolean;
    online: boolean;
  }[];
  open: boolean;
  close(): void;
  title: string;
}

const FollowsModal: React.FC<Props> = ({ data, title, ...props }) => {
  return (
    <ModalWrapper {...props}>
      <Container>
        <header>
          <Title bordered={false} size="small">
            {title}
          </Title>

          <button onClick={() => props.close()}>
            <img src={close} alt="close" />
          </button>
        </header>

        {data.map(follow => (
          <FollowCard key={follow.id} follow={follow} />
        ))}
      </Container>
      <SeeMore>See More</SeeMore>
    </ModalWrapper>
  );
};

export default FollowsModal;
