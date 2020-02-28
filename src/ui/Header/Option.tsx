import React, { useCallback } from 'react';
import styled from 'styled-components';

import Avatar from '../Avatar';
import FollowButton from '../FollowButton';

import verified from '../assets/verified.png';

import { UserProps } from './Header';

const Container = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #fff;

    div {
      display: flex;
      align-items: flex-end;

      img {
        margin-left: 4px;
        height: 20px;
        margin-bottom: 4px;
      }
    }

    strong {
      color: #fff;
      font-size: 16px;
      font-weight: 900;
    }

    span {
      margin-top: 0;
      font-size: 16px;
      color: #6f767e;
    }
  }
`;

const Button = styled(FollowButton)`
  width: 115px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  value: UserProps;
  onSelect(value: UserProps): void;
}

const Option: React.FC<Props> = ({ value, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    <Container onClick={handleClick}>
      <div>
        <Avatar online={value.online} src={value.avatar} alt={value.name} size="default" />

        <section>
          {!value.verified ? (
            <strong>{value.name}</strong>
          ) : (
            <div>
              <strong>{value.name}</strong>
              <img src={verified} alt="verified" />
            </div>
          )}
          <span>{value.username}</span>
        </section>
      </div>
      <Button following={value.following} />
    </Container>
  );
};

export default Option;
