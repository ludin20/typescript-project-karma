import React from 'react';
import ReactInfiniteScroll from 'react-infinite-scroll-component';

import Loading from './Loading';

interface InfinityScrollProps {
  loadMore(): void;
  length: number;
}

const InfinityScroll: React.FC<InfinityScrollProps> = ({ children, loadMore, length }) => {
  return (
    <ReactInfiniteScroll dataLength={length} next={loadMore} hasMore loader={<Loading withContainer />}>
      {children}
    </ReactInfiniteScroll>
  );
};

export default InfinityScroll;
