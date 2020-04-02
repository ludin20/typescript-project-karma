import React from 'react';
import { css } from 'styled-components';

import Space from '../common/Space';
import Text from '../common/Text';

import CreateComment from './CreateComment';
import Comment from './Comment';

const subTitleCss = css`
  @media (min-width: 550px) {
    display: none;
  }
`;

interface Props {
  comments: { cmmt_id: string; author: string; author_profilehash: string; created_at: string; text: string }[];
  avatar: string;
}

const PostComments: React.FC<Props> = ({ comments, avatar }) => {
  return (
    <>
      <Space height={30} />
      <div>
        <CreateComment avatar={avatar} />
      </div>
      <Text size={16} weight="bold" color="white" css={subTitleCss}>
        All comments
      </Text>
      {comments.map(comment => (
        <React.Fragment key={comment.cmmt_id}>
          <Space height={20} />
          <Comment key={comment.cmmt_id} {...comment} />
          <Space height={20} />
        </React.Fragment>
      ))}
    </>
  );
};

export default PostComments;
