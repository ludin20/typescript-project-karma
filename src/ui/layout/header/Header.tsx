import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';

import SearchBar from './SearchBar';
import Actions from './Actions';

import { updateProfileSuccess } from '../../../store/ducks/user';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(26, 27, 29, 0.8);

  display: flex;
  align-items: center;

  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  overflow: auto;
`;

const Container = styled.div<{ collapsed: boolean; shouldHideHeader: boolean }>`
  width: 100%;
  background: ${props => props.theme.black};
  padding: ${props => (!props.collapsed ? '30px 340px 10px 0' : '30px 160px 10px 0')};

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: fixed;
  top: 0;
  z-index: 10;

  @media (min-width: 1440px) {
    max-width: 1415px;
  }

  @media (max-width: 1200px) {
    padding: 30px 160px 10px 0;
  }

  @media (max-width: 700px) {
    padding: 30px 15px 10px 0;
  }

  ${props =>
    props.shouldHideHeader &&
    css`
      @media (max-width: 700px) {
        display: none;
      }
    `}
`;

const GET_PROFILES = graphql`
  query Profiles($accountname: String!, $searchterm: String, $page: Int, $pathBuilder: any) {
    profiles(accountname: $accountname, searchterm: $searchterm, page: $page)
      @rest(type: "Profile", pathBuilder: $pathBuilder) {
      author
      bio
      hash
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
    }
  }
`;

export interface UserProps {
  author: string;
  username: string;
  hash: string;
  displayname: string;
  isFollowing: boolean;
}

interface Props {
  collapsed: boolean;
  shouldHideCreatePost?: boolean;
  shouldHideHeader?: boolean;
  author: string;
  hash: string;
  profile: any;
}

const Header: React.FC<Props> = ({ collapsed, shouldHideCreatePost, shouldHideHeader, author, hash, profile }) => {
  const dispatch = useDispatch();
  const [searchFocused, setSearchFocused] = useState(false);
  const [users, setUsers] = useState([]);
  const sectionRef = useRef<HTMLElement>();

  const { fetchMore } = useQuery(GET_PROFILES, {
    variables: {
      accountname: author,
      searchterm: '',
      page: 1,
      pathBuilder: () => `profile/search/${author}?Page=${1}&Limit=5&domainId=${1}`,
    },
    onCompleted: data => {
      const profiles = data.profiles.map((data: { author: string }) => ({
        ...data,
        isFollowing: !!profile.following.find(item => item == data.author),
      }));
      if (searchFocused) setUsers(profiles);

      // Scroll to the bottom
      setTimeout(() => {
        if (sectionRef.current) sectionRef.current.scrollTo(0, sectionRef.current.scrollHeight);
      }, 100);
    },
  });

  const autoCompleteSearch = useCallback(
    async (searchterm: string, page?: number) => {
      const pageVal = page ? page : 1;

      fetchMore({
        variables: {
          searchterm,
          page: pageVal,
          pathBuilder: () => `profile/search/${searchterm}?Page=${pageVal}&Limit=5&domainId=${1}`,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;

          return pageVal > 1
            ? Object.assign({}, previousResult, {
                profiles: [...previousResult.profiles, ...fetchMoreResult.profiles],
              })
            : fetchMoreResult;
        },
      });
    },
    [fetchMore],
  );

  const handleFollow = (author: string, follow: boolean) => {
    if (follow) {
      const data = {
        following: [...profile.following, author],
        following_count: profile.following_count + 1,
      };
      dispatch(updateProfileSuccess(data));
    } else {
      const data = {
        following: profile.following.filter(item => item != author),
        following_count: profile.following_count - 1,
      };
      dispatch(updateProfileSuccess(data));
    }
  };

  return searchFocused ? (
    <>
      <Wrapper
        id="wrapper"
        onClick={e => {
          const container = document.getElementById('wrapper');

          if (e.target === container) {
            setUsers([]);
            setSearchFocused(false);
          }
        }}
      />
      <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
        <SearchBar
          focused
          setFocused={setSearchFocused}
          search={autoCompleteSearch}
          data={users}
          shouldHideCreatePost={shouldHideCreatePost}
          sectionRef={sectionRef}
          onFollow={handleFollow}
        />
        <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} hash={hash} />
      </Container>
    </>
  ) : (
    <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
      <SearchBar
        focused={searchFocused}
        setFocused={setSearchFocused}
        search={autoCompleteSearch}
        data={users}
        shouldHideCreatePost={shouldHideCreatePost}
        sectionRef={sectionRef}
        onFollow={handleFollow}
      />
      <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} hash={hash} />
    </Container>
  );
};

export default Header;
