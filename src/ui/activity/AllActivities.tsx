import React from 'react';
import styled from 'styled-components';

import LikeActivity from './LikeActivity';
import CommentActivity from './CommentActivity';
import TipActivity from './TipActivity';
import RecycleActivity from './RecycleActivity';

const Container = styled.div`
  > strong {
    font-size: 26px;
    font-weight: 900;
    color: #fff;
  }

  @media (max-width: 550px) {
    > strong {
      display: none;
    }
  }
`;

interface Props {
  data: any[];
}

const AllActivities: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <strong>Recent</strong>

      {data.map((item, index) => {
        switch (item.type) {
          case 'like':
            return <LikeActivity key={index} item={item} />;
          case 'comment':
            return <CommentActivity key={index} item={item} />;
          case 'tip':
            return <TipActivity key={index} item={item} />;
          case 'recycle':
            return <RecycleActivity key={index} item={item} />;
          default:
            return <div />;
        }
      })}
    </Container>
  );
};

export default AllActivities;
