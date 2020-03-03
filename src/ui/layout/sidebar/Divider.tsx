import React from 'react';
import styled from 'styled-components';

import sidemenu from '../../assets/sidemenu.svg';

const Container = styled.div`
  width: 100%;
  height: 2px;
  margin: 40px 0;
  background: linear-gradient(90deg, rgba(32, 37, 46, 0.4) 0%, rgba(38, 204, 139, 0.4) 100%);

  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 22px;
    height: 40px;
    background: none;

    position: relative;
    right: -1px;

    img {
      height: 40px;
    }
  }
`;

interface Props {
  onClick(): void;
}

const Divider: React.FC<Props> = ({ onClick }) => {
  return (
    <Container>
      <button onClick={() => onClick()}>
        <img src={sidemenu} alt="collapse side menu" />
      </button>
    </Container>
  );
};

export default Divider;
