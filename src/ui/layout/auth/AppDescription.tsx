import React from 'react';
import styled from 'styled-components';

import Space from '../../common/Space';
import hero from '../../assets/hero.png';

const Container = styled.div`
  width: 50%;
  height: 100vh;
  background: ${props => props.theme.dark};
  padding: 50px 70px 30px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  z-index: 100;

  @media (max-width: 1200px) {
    display: none;
  }
`;

interface TextProps {
  green?: boolean;
}
const Text = styled.strong<TextProps>`
  font-weight: bold;
  font-size: 50px;
  font-family: Montserrat, sans-serif;
  color: ${props => (props.green ? props.theme.green : '#fff')};
`;

const Hero = styled.img`
  width: 400px;
`;

const AppDescription: React.FC = () => {
  return (
    <Container>
      <Space height={20} />
      <p>
        <Text>Earn for </Text>
        <Text green>your content.</Text>
      </p>

      <p>
        <Text green>Share </Text>
        <Text>your thoughts.</Text>
      </p>

      <p>
        <Text>Connect with </Text>
        <Text green>friends.</Text>
      </p>

      <Space height={60} />
      <Hero src={hero} alt="Karma" />
    </Container>
  );
};

export default AppDescription;
