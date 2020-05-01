import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import graphql from 'graphql-tag';

import SearchBar from './SearchBar';
import Actions from './Actions';

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
}

interface Props {
  collapsed: boolean;
  shouldHideCreatePost?: boolean;
  shouldHideHeader?: boolean;
  author: string;
  hash: string;
}

const Header: React.FC<Props> = ({ collapsed, shouldHideCreatePost, shouldHideHeader, author, hash }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const { data, fetchMore } = useQuery(GET_PROFILES, {
    variables: {
      accountname: author,
      searchterm: '',
      page: 1,
      pathBuilder: () => `profile/search/${author}?Page=${1}&Limit=5&domainId=${1}`,
    },
  });

  const autoCompleteSearch = useCallback(
    async (searchterm: string) => {
      fetchMore({
        variables: {
          searchterm,
          pathBuilder: () => `profile/search/${searchterm}?Page=${1}&Limit=5&domainId=${1}`,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return fetchMoreResult;
        },
      });

      return data ? data.profiles : null;
    },
    [data, fetchMore],
  );

  return searchFocused ? (
    <>
      <Wrapper
        id="wrapper"
        onClick={e => {
          const container = document.getElementById('wrapper');

          if (e.target === container) {
            setSearchFocused(false);
          }
        }}
      />
      <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
        <SearchBar
          focused
          setFocused={setSearchFocused}
          search={autoCompleteSearch}
          shouldHideCreatePost={shouldHideCreatePost}
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
        shouldHideCreatePost={shouldHideCreatePost}
      />
      <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} hash={hash} />
    </Container>
  );
};

export default Header;
