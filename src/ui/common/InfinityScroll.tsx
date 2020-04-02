import React from 'react';
import ReactInfiniteScroll from 'react-infinite-scroll-component';

import Loading from './Loading';
import Text from './Text';
import Row from './Row';

interface InfinityScrollProps {
  loadMore(): void;
  length: number;
  hasMore?: boolean;
}

const InfinityScroll: React.FC<InfinityScrollProps> = ({ children, loadMore, hasMore, length }) => {
  return (
    <ReactInfiniteScroll
      dataLength={length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Loading withContainer />}
      endMessage={
        <Row style={{ width: '100%' }} justify="center">
          <Text size={20}>No data to show</Text>
        </Row>
      }
    >
      {children}
    </ReactInfiniteScroll>
  );
};

export default InfinityScroll;
