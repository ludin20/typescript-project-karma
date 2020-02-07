import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import close from '../../assets/close.svg';
import search from '../../assets/search.svg';

const Container = styled.div<{ focused: boolean }>`
  width: 100%;
  max-width: 640px;
  background: linear-gradient(90deg, #20252e 0%, #191a19 100%) 0% 0%;
  padding: 10px 15px;
  border-radius: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: auto;
    height: 16px;
  }

  input {
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    font-size: 14px;
    color: #fff;
    margin-left: 10px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  button {
    display: none;
    background: none;

    img {
      width: 18px;
      height: 18px;
    }
  }

  ${props =>
    props.focused &&
    css`
      box-shadow: 0px 3px 50px #00000060;

      button {
        display: inherit;
      }
    `}
`;

const SearchBar: React.FC = () => {
  const [focused, setFocused] = useState(false);

  return (
    <Container focused={focused}>
      <img src={search} alt="search" />
      <input type="text" placeholder="Search KARMA" onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
      {focused && (
        <button onClick={() => setFocused(false)}>
          <img src={close} alt="close" />
        </button>
      )}
    </Container>
  );
};

export default SearchBar;
