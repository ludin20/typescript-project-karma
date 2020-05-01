import graphql from 'graphql-tag';

export const GET_PROFILE = graphql`
  query Profile($accountname: String!, $domainID: number) {
    profile(accountname: $accountname, domainID: $domainID)
      @rest(type: "Profile", path: "profile/{args.accountname}?domainID={args.domainID}") {
      author
      bio
      hash
      displayname
      followers_count
      following_count
      upvoted
      downvoted
      upvoted_count
      downvoted_count
      followers
      following
      posts(accountname: $accountname, domainID: $domainID)
        @rest(type: "Post", path: "posts/account/{args.accountname}?domainID={args.domainID}") {
        post_id
        author
        author_displayname
        author_profilehash
        description
        created_at
        last_edited_at
        imagehashes
        videohashes
        category_ids
        upvote_count
        downvote_count
        comment_count
      }
    }
  }
`;

const GET_ACCOUNT_NAME = graphql`
  query accountName {
    accountName
  }
`;

const resolvers = {
  Post: {
    voteStatus: async ({ post_id }, args, { cache }, info) => {
      // const { profile } = cache.readQuery({
      //   query: GET_PROFILE,
      //   variables: {
      //     accountname: args.accountname,
      //     domainID: 1,
      //   },
      // });

      // if (!profile) {
      //   return 0;
      // }
      // const {
      //   profile: { upvoted, downvoted },
      // } = cache.readQuery({
      //   query: GET_PROFILE,
      //   variables: {
      //     accountname: args.accountname,
      //     domainID: 1,
      //   },
      // });

      // if (upvoted === null || downvoted === null) {
      //   return 0;
      // } else if (upvoted.find((id: number) => id == post_id)) {
      //   return 1;
      // } else if (downvoted.find((id: number) => id == post_id)) {
      //   return -1;
      // } else {
      //   return 0;
      // }
      const upvoted = JSON.parse(localStorage.getItem('upvoted'));
      if (upvoted) {
        if (upvoted.find((id: number) => id == post_id)) return 1;
        else return 0;
      } else {
        return 0;
      }
    },
  },
  Profile: {
    isFollowing: ({ author }, args, { cache }, info) => {
      const {
        profile: { following },
      } = cache.readQuery({
        query: GET_PROFILE,
        variables: {
          accountname: args.accountname,
          domainID: 1,
        },
      });

      if (following === null) {
        return [];
      } else {
        return !!following.find((accountName: string) => accountName == author);
      }
    },
  },
  Following: {
    isFollowing: ({ author }, args, { cache }, info) => {
      const {
        profile: { following },
      } = cache.readQuery({
        query: GET_PROFILE,
        variables: {
          accountname: args.accountname,
          domainID: 1,
        },
      });

      if (following === null) {
        return [];
      } else {
        return !!following.find((accountName: string) => accountName == author);
      }
    },
  },
  Followers: {
    isFollowing: ({ author }, args, { cache }, info) => {
      const {
        profile: { following },
      } = cache.readQuery({
        query: GET_PROFILE,
        variables: {
          accountname: args.accountname,
          domainID: 1,
        },
      });

      if (following === null) {
        return [];
      } else {
        return !!following.find((accountName: string) => accountName == author);
      }
    },
  },
  Query: {
    profile: async (obj, args, { cache }, info) => {
      return cache.readQuery({
        query: GET_ACCOUNT_NAME,
      });
    },
  },
};

const defaults = {
  profile: {
    followers: [],
    following: [],
    upvoted: [],
    downvoted: [],
    __typename: 'profile',
  },
};

export { resolvers, defaults };
