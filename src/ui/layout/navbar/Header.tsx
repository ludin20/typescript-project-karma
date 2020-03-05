import React from 'react';
import styled from 'styled-components';

const Container = styled.header<{ withAvatar: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    width: 90px;
    height: 90px;
    margin: 20px 0 15px;
    border-radius: 50%;
    border: ${props => `3px solid ${props.theme.green}`};
    box-shadow: 1px 1px 3px #26cc8b;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    section {
      width: 1px;
      height: 1px;
      box-shadow: 0 0 50px 30px #26cc8b;
      border-radius: 50%;

      position: absolute;
      top: 50%;
      left: 50%;
    }

    > img {
      position: relative;
      width: ${props => (props.withAvatar ? '75px' : '50px')};
      height: ${props => (props.withAvatar ? '75px' : ' 50px')};
      border-radius: 50%;
    }
  }

  strong {
    color: #fff;
    font-size: 24px;
    font-weight: 900;
    font-family: Montserrat, sans-serif;
  }

  span {
    color: #fff;
    margin-top: 5px;
    opacity: 0.4;
    font-size: 18px;
  }

  @media (max-width: 1200px) {
    display: none;
  }
`;

interface Props {
  withAvatar: boolean;
  profile: {
    avatar: string;
    name: string;
    username: string;
  };
}

const Header: React.FC<Props> = ({ profile, ...props }) => {
  return (
    <Container {...props}>
      <div>
        <section />
        <img src={profile.avatar} alt={profile.name} />
      </div>
      <strong>{profile.name}</strong>
      <span>{profile.username}</span>
    </Container>
  );
};

export default Header;
