import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
  margin-top: 30px;

  img {
    width: 100%;
  }

  @media (max-width: 550px) {
    grid-gap: 20px 10px;

    img:first-child {
      grid-column: 1 / -1;
    }
  }
`;

interface Props {
  data: string[];
}

const Grid: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      {data.map((image, index) => (
        <img key={String(index)} src={image} alt="discover" />
      ))}
    </Container>
  );
};

export default Grid;
