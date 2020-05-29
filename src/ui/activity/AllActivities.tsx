import React from 'react';
import styled, { css } from 'styled-components';

import cookie from 'js-cookie';

import heart from '../assets/green-heart.svg';
import comment from '../assets/activity-comment.svg';
import tip from '../assets/tip-big.png';
import recycled from '../assets/recycled.svg';
import sent from '../assets/karmas.png';
import InfinityScroll from '../common/InfinityScroll';
import { KARMA_AUTHOR } from '../../common/config';

import ActivityItem from './ActivityItem';

const Container = styled.div`
  > strong {
    font-size: 26px;
    font-weight: 900;
    color: #fff;
  }

  @media (max-width: 550px) {
    > strong {
    }
  }
`;

const greenText = css`
  color: ${p => p.theme.green};
`;

interface Props {
  data: {
    sender: string;
    receiver: string;
    trx_id: string;
    action: string;
    data: string;
    memo: string;
    sender_displayname: string;
    receiver_displayname: string;
    receiver_profile_hash: any;
    sender_profile_hash: string;
    post_image_hashes: any;
    post_video_hashes: any;
    created_at: string;
    username: string;
    __typename: string;
  }[];
  loadMore(): void;
}

const AllActivities: React.FC<Props> = ({ data, loadMore }) => {
  return (
    <Container>
      <strong>Recent</strong>

      <InfinityScroll
        length={data.length}
        loadMore={loadMore}
        hasMore={data.length > 0 && data[data.length - 1]['action'] != 'end'}
      >
        {data.map((item, index) => {
          if (item.action == 'Transfer' || item.sender != cookie.get(KARMA_AUTHOR)) {
            switch (item.action) {
              case 'Upvote':
                return (
                  <ActivityItem
                    key={index}
                    icon={heart}
                    avatar={item.sender_profile_hash}
                    author={item.sender}
                    displayname={item.sender_displayname}
                    action="liked your post:"
                    date={item.created_at}
                    post={item.post_image_hashes ? item.post_image_hashes[0] : undefined}
                  />
                );
              case 'Createcmmt':
                return (
                  <ActivityItem
                    key={index}
                    icon={comment}
                    avatar={item.sender_profile_hash}
                    author={item.sender}
                    displayname={item.sender_displayname}
                    action="commented on your post:"
                    post={item.post_image_hashes ? item.post_image_hashes[0] : undefined}
                    date={item.created_at}
                  />
                );
              case 'tip':
                return (
                  <ActivityItem
                    key={index}
                    icon={tip}
                    avatar={item.sender_profile_hash}
                    author={item.sender}
                    displayname={item.sender_displayname}
                    action="tipped you:"
                    post={item.post_image_hashes ? item.post_image_hashes[0] : undefined}
                    date={item.created_at}
                    content={item.data}
                    contentCss={greenText}
                  />
                );
              case 'recycle':
                return (
                  <ActivityItem
                    key={index}
                    icon={recycled}
                    avatar={item.sender_profile_hash}
                    author={item.sender}
                    displayname={item.sender_displayname}
                    action="recycled your post:"
                    date={item.created_at}
                    post={item.post_image_hashes ? item.post_image_hashes[0] : undefined}
                    content={`"${item.data}"`}
                  />
                );
              case 'Transfer':
                return (
                  <ActivityItem
                    key={index}
                    icon={sent}
                    avatar={item.sender_profile_hash}
                    author={item.sender}
                    displayname={item.sender_displayname}
                    action="sent you:"
                    date={item.created_at}
                    content={item.data}
                    contentCss={greenText}
                  />
                );
              default:
                return null;
            }
          }
        })}
      </InfinityScroll>
    </Container>
  );
};

export default AllActivities;
