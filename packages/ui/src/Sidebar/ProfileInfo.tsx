import React from 'react';
import styled from 'styled-components';

import { ProfileProps } from './Sidebar';

const Container = styled.ul`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;

    strong {
      font-weight: 500;
      color: #fff;
      font-size: 16px;
    }

    span {
      color: #fff;
      font-size: 12px;
      margin-top: 5px;
      opacity: 0.4;
    }

    & + li {
      margin-left: 20px;
      padding-left: 20px;
      border-left: ${props => `1px solid ${props.theme.green}`};
    }
  }
`;

interface Props {
  profile: ProfileProps;
}

const ProfileInfo: React.FC<Props> = ({ profile }) => {
  return (
    <Container>
      <li>
        <strong>{profile.followers}</strong>
        <span>Followers</span>
      </li>

      <li>
        <strong>{profile.power}</strong>
        <span>Power</span>
      </li>

      <li>
        <strong>{profile.following}</strong>
        <span>Following</span>
      </li>
    </Container>
  );
};

export default ProfileInfo;
