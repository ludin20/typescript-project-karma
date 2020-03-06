import React, { useCallback } from 'react';
import styled from 'styled-components';

import Avatar from '../../common/Avatar';
import FollowButton from '../../common/FollowButton';

import verified from '../../assets/verified.png';

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

  @media (max-width: 700px) {
    section > strong {
    }
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 50px !important;
  height: 50px !important;

  @media (max-width: 860px) {
    width: 40px !important;
    height: 40px !important;
  }
`;

const Button = styled(FollowButton)`
  width: 115px;

  display: flex !important;
  align-items: center;
  justify-content: center;

  @media (max-width: 860px) {
    width: unset;
    padding: 6px 15px;
    font-size: 14px;
  }
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
        <StyledAvatar online={value.online} src={value.avatar} alt={value.name} size="default" />

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
