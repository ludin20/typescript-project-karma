import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

import verified from '../assets/verified.png';
import powerIcon from '../assets/power.svg';

const Container = styled.div`
  > header {
    margin-top: 14px;

    display: flex;
    justify-content: space-between;
    align-items: baseline;

    p {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      color: #fff;

      div {
        display: flex;
        align-items: flex-end;

        img {
          margin-left: 5px;
          height: 26px;
        }
      }

      strong {
        font-size: 24px;
      }

      span {
        margin-top: 6px;
        font-size: 16px;
        color: ${props => props.theme.lightBlue};
      }
    }
  }

  > p {
    max-width: 250px;
    color: #fff;
    font-size: 15px;
    line-height: 1.4;
    margin: 12px 0 6px;
    padding-left: 16px;
    text-align: left;

    position: relative;

    &::after {
      content: '';
      width: 5px;
      height: 100%;
      background: ${props => props.theme.green};
      border-radius: 10px;

      position: absolute;
      top: 0;
      left: 0;
    }
  }

  > a {
    color: #2996dd;
    font-size: 14px;
    margin-left: 10px;
  }
`;

const Actions = styled.div`
  display: flex;
`;

const ActionsButton = styled(Button)`
  font-weight: 900;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 16px;
    margin-right: 5px;
  }

  &:first-child {
    box-shadow: 0px 3px 50px #00000034;
  }

  & + button {
    margin-left: 20px;
  }
`;

interface Props {
  name: string;
  username: string;
  isVerified: boolean;
  power: string | number;
  bio: string;
  website: string;
  handleModal: () => void;
}

const ProfileInfo: React.FC<Props> = ({ name, username, isVerified, power, website, handleModal, ...props }) => {
  const bio = props.bio ? props.bio.split('\n') : [];

  return (
    <Container {...props}>
      <header>
        <p>
          {!isVerified ? (
            <strong>{name}</strong>
          ) : (
            <div>
              <strong>{name}</strong>
              <img src={verified} alt="verified" />
            </div>
          )}
          <span>{username}</span>
        </p>

        <Actions>
          <ActionsButton background="dark" radius="rounded" color={'#26CC8B'}>
            <img src={powerIcon} alt="power" />
            {power} Power
          </ActionsButton>

          <ActionsButton border radius="rounded" onClick={handleModal}>
            Edit Profile
          </ActionsButton>
        </Actions>
      </header>

      {bio.length > 0 && (
        <p>
          {bio.map(line => (
            <>
              {line}
              <br />
            </>
          ))}
        </p>
      )}
      {website && <a>{website}</a>}
    </Container>
  );
};

export default ProfileInfo;
