import React, { useState, useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import styled, { css, keyframes } from 'styled-components';
import graphql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { updateProfileSuccess } from '../../store/ducks/user';

import { withApollo } from '../../apollo/Apollo';

import Sidebar from './navbar/Sidebar';
import Bottombar from './navbar/Bottombar';
import loadingImg from '../assets/loading.png';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  background: ${props => props.theme.black};
  display: flex;
  width: 100%;
`;

const Loader = styled.div`
  position: fixed;
  z-index: 99999999;
  opacity: 0.4;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  height: 16px;
  animation: ${rotate} 1.5s infinite;
  height: 28px;
`;

const Container = styled.div<{ collapsed: boolean; shouldHideHeader: boolean }>`
  min-height: 100vh;
  width: ${props => (!props.collapsed ? 'calc(100% - 280px)' : 'calc(100% - 100px)')};

  left: ${props => (!props.collapsed ? '280px' : '100px')};

  position: relative;

  @media (max-width: 1200px) {
    min-height: 100vh;
    width: calc(100% - 100px);

    left: 100px;
  }

  @media (max-width: 700px) {
    min-width: 100% !important;
    max-width: 100% !important;
    margin-left: 0;

    left: 0;
  }

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        padding: 0 0 140px;
      }
    `}
`;

const ContentWrapper = styled.div<{ shouldHideHeader: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        margin-top: 0;
      }
    `}
`;

const Content = styled.div`
  width: 100%;
`;

interface Props {
  shouldHideCreatePost?: boolean;
  shouldHideHeader?: boolean;
  author: string;
  profile: {
    username: string;
    displayname: string;
    author: string;
    hash: string;
    bio: string;
  } | null;
}

const GET_PROFILE = graphql`
  query Profile($accountname: String!, $domainID: number) {
    profile(accountname: $accountname, domainID: $domainID)
      @rest(type: "Profile", path: "profile/{args.accountname}?domainID={args.domainID}") {
      author
      bio
      hash
      url
      displayname
      username
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

const ReferandEarnLayout: React.FC<Props> = ({
  children,
  shouldHideCreatePost,
  shouldHideHeader,
  author,
  profile,
  ...props
}) => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountProfile, setProfile] = useState(profile);
  const [loadState, setLoadState] = useState(false);

  useQuery(GET_PROFILE, {
    variables: {
      accountname: author,
      domainID: 1,
      pathBuilder: () => `profile/${author}?domainID=${1}`,
    },
    onCompleted: data => {
      if (data && data.profile) {
        setProfile(data.profile);
        setLoadState(true);
        dispatch(updateProfileSuccess(data.profile));
      }
    },
  });

  return (
    <Wrapper {...props}>
      {isLoading && (
        <Loader>
          <Image src={loadingImg} />
        </Loader>
      )}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} author={author} profile={accountProfile} />

      <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
        <ContentWrapper shouldHideHeader={shouldHideHeader}>
          {loadState ? <Content>{children}</Content> : null}
        </ContentWrapper>
      </Container>

      <Bottombar />
    </Wrapper>
  );
};

const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(withApollo({ ssr: true })(ReferandEarnLayout));
