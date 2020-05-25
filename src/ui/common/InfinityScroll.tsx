import React from 'react';
import { connect } from 'react-redux';
import ReactInfiniteScroll from 'react-infinite-scroll-component';

import Loading from './Loading';
import Text from './Text';
import Row from './Row';
import { has } from 'immer/dist/common';

interface InfinityScrollProps {
  loadMore(): void;
  length: number;
  hasMore?: boolean;
}
const InfinityScroll: React.FC<InfinityScrollProps> = ({ children, loadMore, hasMore, length }) => {
  console.log('hasmore', hasMore);
  return (
    <ReactInfiniteScroll
      dataLength={length}
      next={loadMore}
      hasMore={hasMore}
      loader={<Loading withContainer />}
      endMessage={
        length > 0 ? null : (
          <Row style={{ width: '100%' }} justify="center">
            <Text size={20}>No data to show</Text>
          </Row>
        )
      }
    >
      {children}
    </ReactInfiniteScroll>
  );
};

const mapStateToProps = state => ({
  hasMore: state.action.hasMore,
});

export default connect(mapStateToProps)(InfinityScroll);
