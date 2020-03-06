import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { search as MockSearch } from '../../../mock';

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

export interface UserProps {
  id: number;
  name: string;
  username: string;
  avatar: string;
  following: boolean;
  online: boolean;
  verified: boolean;
}

interface Props {
  collapsed: boolean;
  shouldHideCreatePost?: boolean;
  shouldHideHeader?: boolean;
}

const getUserName = (value: UserProps) => value.name;
const getId = (value: UserProps) => value.username;

const Header: React.FC<Props> = ({ collapsed, shouldHideCreatePost, shouldHideHeader }) => {
  const [searchFocused, setSearchFocused] = useState(false);

  const autoCompleteSearch = useCallback(async (searchString: string, signal: AbortSignal) => {
    return MockSearch.filter(item => item.name.toLocaleLowerCase().includes(searchString));
  }, []);

  return searchFocused ? (
    <>
      <Wrapper />
      <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
        <SearchBar
          focused={searchFocused}
          setFocused={setSearchFocused}
          search={autoCompleteSearch}
          getId={getId}
          getText={getUserName}
          shouldHideCreatePost={shouldHideCreatePost}
        />
        <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} />
      </Container>
    </>
  ) : (
    <Container collapsed={collapsed} shouldHideHeader={shouldHideHeader}>
      <SearchBar
        focused={searchFocused}
        setFocused={setSearchFocused}
        search={autoCompleteSearch}
        getId={getId}
        getText={getUserName}
        shouldHideCreatePost={shouldHideCreatePost}
      />
      <Actions focused={searchFocused} shouldHideCreatePost={shouldHideCreatePost} />
    </Container>
  );
};

export default Header;
