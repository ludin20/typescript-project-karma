import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { search as MockSearch } from '@karma/mock';

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

const Container = styled.div`
  height: 50px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  position: relative;
  top: 0;
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

const getUserName = (value: UserProps) => value.name;
const getId = (value: UserProps) => value.username;

const Header: React.FC = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  const autoCompleteSearch = useCallback(async (searchString: string, signal: AbortSignal) => {
    return MockSearch.filter(item => item.name.toLocaleLowerCase().includes(searchString));
  }, []);

  return searchFocused ? (
    <>
      <Wrapper />
      <Container>
        <SearchBar
          focused={searchFocused}
          setFocused={setSearchFocused}
          search={autoCompleteSearch}
          getId={getId}
          getText={getUserName}
        />
        <Actions />
      </Container>
    </>
  ) : (
    <Container>
      <SearchBar
        focused={searchFocused}
        setFocused={setSearchFocused}
        search={autoCompleteSearch}
        getId={getId}
        getText={getUserName}
      />
      <Actions />
    </Container>
  );
};

export default Header;
