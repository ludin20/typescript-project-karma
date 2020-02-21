import React from 'react';
import styled from 'styled-components';

import Option from './Option';
import { UserProps } from './Header';

const Container = styled.div`
  width: 100%;
  max-width: 853px;
  background: linear-gradient(90deg, #20252e 0%, #191a19 100%);
  border-radius: 0 0 50px 50px;

  position: absolute;
  z-index: 200;
  left: 0;
  top: 20px;

  > section {
    padding: 70px 40px 20px;
  }
`;

const OptionMessage = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  align-items: center;
  color: #fff;
`;

const SeeMore = styled.button`
  width: 100%;
  background: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  padding: 15px 0;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 0 0 25px 25px;
`;

interface Props {
  loading: boolean;
  results: UserProps[];
  getId(value: UserProps): string;
  handleSelectOption(value: UserProps): void;
}

const OptionsContainer: React.FC<Props> = ({ loading, results, getId, handleSelectOption }) => {
  return (
    <Container>
      <section>
        {loading ? (
          <OptionMessage>Loading</OptionMessage>
        ) : results == null || results.length === 0 ? (
          <OptionMessage>Nothing found</OptionMessage>
        ) : (
          results.map((result, index) => (
            <Option key={getId(result) || index} value={result} onSelect={handleSelectOption} />
          ))
        )}
      </section>

      <SeeMore>See More</SeeMore>
    </Container>
  );
};

export default OptionsContainer;
