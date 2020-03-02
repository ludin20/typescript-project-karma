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
`;

interface Props {
  data: {
    id: string | number;
    image: string;
  }[];
}

const Grid: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      {data.map(item => (
        <img key={item.id} src={item.image} alt="new" />
      ))}
    </Container>
  );
};

export default Grid;
