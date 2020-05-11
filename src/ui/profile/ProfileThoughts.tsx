import React from 'react';
import styled from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';

import { PostCard, Space } from '../index';
import InfinityScroll from '../common/InfinityScroll';

const Container = styled.ul`
  width: 100%;
  margin-bottom: 30px;
`;

interface Props {
  profile: any;
  posts: any[];
  loadMore(): void;
}

const ProfileThoughts: React.FC<Props> = ({ posts, profile, loadMore }) => {
  return (
    <InfinityScroll length={posts.length} loadMore={loadMore} hasMore={posts.length > 0}>
      <SkeletonTheme color="#191A19" highlightColor="#333">
        <Container>
          {posts.map((post, index) => (
            <React.Fragment key={String(index)}>
              {index > 0 && <Space height={40} />}
              <PostCard
                me
                post={{ ...post, imagehashes: [], videohashes: [] }}
                wax={profile.wax}
                eos={profile.eos}
                liquidBalance={Math.floor(profile.liquidBalance)}
                upvoted={profile.upvoted}
                withFollowButton={false}
                isDetails={false}
                size="small"
              />
            </React.Fragment>
          ))}
        </Container>
      </SkeletonTheme>
    </InfinityScroll>
  );
};

export default ProfileThoughts;
