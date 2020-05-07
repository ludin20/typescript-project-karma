import React from 'react';
import styled from 'styled-components';

import Space from '../../common/Space';

import Option from './Option';
import { UserProps } from './Header';

const Container = styled.div`
  width: 100%;
  background: linear-gradient(90deg, #20252e 0%, #191a19 100%);
  border-radius: 0 0 50px 50px;

  position: absolute;
  left: 0;
  top: 20px;
  z-index: -100;

  > section {
    padding: 70px 40px 20px;
  }

  @media (max-width: 860px) {
    > section {
      padding: 70px 20px 20px;
    }
  }
`;

const Section = styled.section`
  overflow-y: auto;
  max-height: 470px;
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
  background: #000 !important;
  color: #fff;
  font-size: 16px;
  font-weight: 900;
  padding: 15px 0;
  box-shadow: 0 3px 6px #00000029;
  border-radius: 0 0 25px 25px;
  display: inherit !important;
`;

interface Props {
  loading: boolean;
  results: UserProps[];
  onBlur(): void;
  loadMore(): void;
  sectionRef?: any;
  onFollow?(author: string, follow: boolean): void;
}

const OptionsContainer: React.FC<Props> = ({ loading, results, onBlur, loadMore, sectionRef, onFollow }) => {
  return (
    <Container>
      <Section ref={sectionRef}>
        {loading ? (
          <OptionMessage>Loading</OptionMessage>
        ) : results == null || results.length === 0 ? (
          <OptionMessage>Nothing found</OptionMessage>
        ) : (
          results.map((profile, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Space height={20} />}
              <Option profile={profile} onBlur={onBlur} onFollow={onFollow} />
            </React.Fragment>
          ))
        )}
      </Section>

      <SeeMore onClick={() => loadMore()}>See More</SeeMore>
    </Container>
  );
};

export default OptionsContainer;
