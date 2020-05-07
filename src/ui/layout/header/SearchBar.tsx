import React, { useRef, useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useDebounce } from '../../../hooks/useDebounce';

import close from '../../assets/close.svg';
import searchIcon from '../../assets/search.svg';

import OptionsContainer from './OptionsContainer';
import { UserProps } from './Header';

const Container = styled.div<{ focused: boolean; shouldHideCreatePost: boolean }>`
  width: 100%;
  background: linear-gradient(90deg, #20252e 0%, #191a19 100%) 0% 0%;
  margin-right: 60px;
  padding: 10px 15px;
  border-radius: 50px;
  border: 1px solid #20252e;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  img {
    width: auto;
    height: 20px;
  }

  input {
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: 300;
    color: #fff;
    margin-left: 10px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  @media (max-width: 1200px) {
    margin-right: 60px;
  }

  @media (max-width: 550px) {
    background: none;
    border: none;
    margin-right: 0;
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

      @media (max-width: 800px) {
        min-width: calc(100% - 15px);
        width: unset;
      }

      @media (max-width: 550px) {
        background: #1f252f;
      }
    `}

  ${props =>
    props.shouldHideCreatePost &&
    css`
      @media (max-width: 550px) {
        box-shadow: 0px 3px 50px #00000066;
      }
    `}
`;

interface Props {
  data: UserProps[];
  focused: boolean;
  setFocused: (value: boolean) => void;
  search(searchString: string, page?: number): void;
  shouldHideCreatePost?: boolean;
  sectionRef?: any;
  onFollow?(author: string, follow: boolean): void;
}

const SearchBar: React.FC<Props> = ({
  focused,
  setFocused,
  search,
  data,
  shouldHideCreatePost,
  sectionRef,
  onFollow,
}) => {
  const [textValue, setTextValue] = useState('');
  const [isEmpty, setEmpty] = useState(() => isStringEmpty(textValue));
  const ref = useRef<HTMLInputElement>();

  const triggerNewSearch = useDebounce(
    useCallback(
      (text: string, page?: number) => {
        setEmpty(false);

        page ? search(text, page) : search(text);
      },
      [search],
    ),
    500,
    { leading: false },
  );

  const handleChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const text = evt.target.value;
      setTextValue(text);

      if (isStringEmpty(text)) {
        setEmpty(true);
        return;
      }
      triggerNewSearch(text);
    },
    [triggerNewSearch],
  );

  const onBlur = () => {
    setTextValue('');
    setFocused(false);
  };

  useEffect(() => {
    if (ref.current && focused) {
      ref.current.focus();
    }
  }, [focused]);

  return (
    <Container focused={focused} shouldHideCreatePost={shouldHideCreatePost}>
      <img src={searchIcon} alt="search" />
      <input
        type="text"
        placeholder="Search KARMA"
        ref={ref}
        onFocus={() => setFocused(true)}
        // onBlur={onBlur}
        onChange={handleChange}
        value={textValue}
      />
      {focused && (
        <button onClick={onBlur}>
          <img src={close} alt="close" />
        </button>
      )}

      {focused && !isEmpty && (
        <OptionsContainer
          sectionRef={sectionRef}
          onBlur={onBlur}
          loadMore={() => triggerNewSearch(textValue, Math.ceil(data.length / 5) + 1)}
          loading={false}
          results={data}
          onFollow={onFollow}
        />
      )}
    </Container>
  );
};

export default SearchBar;

function isStringEmpty(text: string) {
  return !text || text.trim().length <= 1;
}
