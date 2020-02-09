import React from 'react';
import styled from 'styled-components';

const Container = styled.ul`
  margin-top: 20px;
`;

interface Props {
  data: any[];
  renderItem: (item: any) => React.FC;
}

const Posts: React.FC<Props> = ({ data, renderItem }) => {
  return <Container>{data.map(item => renderItem(item))}</Container>;
};

export default Posts;
