import React from 'react';
import styled from 'styled-components';

import hero from '../../assets/hero.png';

const Container = styled.div`
  width: 50%;
  background: ${props => props.theme.dark};
  padding: 50px 70px 30px;

  display: flex;
  flex-direction: column;

  position: relative;
  z-index: 100;

  p {
    margin-top: 20px;
    font-family: Montserrat, sans-serif;

    &:first-child,
    &:nth-child(3) {
      strong {
        color: #fff;
        font-size: 40px;

        & + strong {
          color: ${props => props.theme.green};
        }
      }
    }

    &:nth-child(2) {
      strong {
        color: ${props => props.theme.green};
        font-size: 40px;

        & + strong {
          color: #fff;
        }
      }
    }
  }

  p + img {
    width: 400px;
    margin-top: 60px;
  }
`;

const Aside: React.FC = () => {
  return (
    <Container>
      <p>
        <strong>Earn for </strong>
        <strong>your content.</strong>
      </p>

      <p>
        <strong>Share </strong>
        <strong>your thoughts.</strong>
      </p>

      <p>
        <strong>Connect with </strong>
        <strong>friends.</strong>
      </p>

      <img src={hero} alt="Karma" />
    </Container>
  );
};

export default Aside;
