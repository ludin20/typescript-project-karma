import karmaApi from '../services/api';
import { TOKEN_CONTRACT } from '../common/config';

export const fetchPost = async (id: number) => {
  const response = await karmaApi.get(`post/${id}`);
  return response.data;
};

export const fetchComment = async (commentId: number) => {
  const response = await karmaApi.get(`comment/${commentId}`);
  return response.data;
};

export const fetchProfile = async (accountName: string) => {
  const response = await karmaApi.get(`comment/profile/${accountName}?domainID=1`);
  return response.data;
};

const findId = (data, internal, external) =>
  data.processed.action_traces[0].inline_traces.find(trace => trace.act.name == internal).act.data[external];

export default {
  createPost: {
    action: {
      name: 'createpost',
      senderPath: 'post.author',
      dataPath: 'post',
    },
    txToId: data => findId(data, 'postid', 'post_id'),
    idToContent: fetchPost,
    typeName: 'Post',
  },
  createComment: {
    action: {
      name: 'createcmmt',
      senderPath: 'author',
      dataPath: null,
    },
    txToId: data => findId(data, 'cmmtid', 'cmmt_id'),
    idToContent: fetchComment,
    typeName: 'Comment',
  },
  upVote: {
    action: {
      name: 'upvote',
      senderPath: 'author',
      dataPath: null,
    },
    txToId: null,
    idToContent: null,
    typeName: 'Vote',
  },
  downVote: {
    action: {
      name: 'downvote',
      senderPath: 'author',
      dataPath: null,
    },
    txToId: null,
    idToContent: null,
    typeName: 'Vote',
  },
  follow: {
    action: {
      name: 'follow',
      senderPath: 'author',
      dataPath: null,
    },
    txToId: null,
    idToContent: null,
    typeName: 'Follow',
  },
  unFollow: {
    action: {
      name: 'unfollow',
      senderPath: 'author',
      dataPath: null,
    },
    txToId: null,
    idToContent: null,
    typeName: 'Follow',
  },
  editProfile: {
    action: {
      name: 'storeprfl',
      senderPath: 'profile.author',
      dataPath: 'profile',
    },
    txToId: null,
    idToContent: fetchProfile,
    typeName: 'Profile',
  },
  powerUp: {
    action: {
      name: 'powerup',
      senderPath: 'owner',
      dataPath: null,
      contract: TOKEN_CONTRACT,
    },
    txToId: null,
    idToContent: null,
    typeName: 'Power',
  },
  powerDown: {
    action: {
      name: 'powerdown',
      senderPath: 'owner',
      dataPath: null,
      contract: TOKEN_CONTRACT,
    },
    txToId: null,
    idToContent: null,
    typeName: 'Power',
  },
  claim: {
    action: {
      name: 'claim',
      senderPath: 'owner',
      dataPath: null,
      contract: TOKEN_CONTRACT,
    },
    txToId: data => data,
    idToContent: () => 5,
    typeName: 'Claim',
  },
};
