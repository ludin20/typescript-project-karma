import React, { useRef, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import { useDebounce } from '../../hooks/useDebounce';

import close from '../assets/close.svg';
import searchIcon from '../assets/search.svg';

import OptionsContainer from './OptionsContainer';
import { UserProps } from './Header';

const Container = styled.div<{ focused: boolean }>`
  width: 100%;
  background: linear-gradient(90deg, #20252e 0%, #191a19 100%) 0% 0%;
  margin-right: 70px;
  padding: 10px 15px;
  border-radius: 50px;
  border: 1px solid #20252e;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  z-index: 1000;

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
    font-weight: 300;
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

interface Props {
  focused: boolean;
  setFocused: (value: boolean) => void;
  getText(value: UserProps): string | null | undefined;
  getId(value: UserProps): string;
  search(searchString: string, signal: AbortSignal): Promise<UserProps[]>;
}

const SearchBar: React.FC<Props> = ({ focused, setFocused, getId, getText, search }) => {
  const abortRef = useRef<AbortController | null>();
  const [results, setResults] = useState<UserProps[]>();
  const [isEmpty, setEmpty] = useState(() => isStringEmpty(textValue));
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState(() => '');

  const triggerNewSearch = useDebounce(
    useCallback(
      (text: string) => {
        const abortController = new AbortController();
        abortRef.current = abortController;
        setLoading(true);
        setEmpty(false);
        search(text, abortController.signal)
          .then(results => {
            if (!abortController.signal.aborted) {
              setResults(results);
            }
          })
          .finally(() => setLoading(false));
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
      if (abortRef.current != null) {
        abortRef.current.abort();
        abortRef.current = null;
      }
      if (isStringEmpty(text)) {
        setEmpty(true);
        return;
      }
      triggerNewSearch(text);
    },
    [triggerNewSearch],
  );

  const handleSelectOption = useCallback(
    (value: UserProps) => {
      setTextValue(getText(value) || '');
    },
    [getText],
  );

  const onBlur = () => {
    setTextValue('');
    setFocused(false);
  };

  return (
    <>
      <Container focused={focused}>
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search KARMA"
          onFocus={() => setFocused(true)}
          onBlur={onBlur}
          onChange={handleChange}
          value={textValue}
        />
        {focused && (
          <button onClick={onBlur}>
            <img src={close} alt="close" />
          </button>
        )}
      </Container>
      {focused && !isEmpty ? (
        <OptionsContainer loading={loading} results={results} handleSelectOption={handleSelectOption} getId={getId} />
      ) : null}
    </>
  );
};

export default SearchBar;

function isStringEmpty(text: string) {
  return !text || text.trim().length <= 1;
}
