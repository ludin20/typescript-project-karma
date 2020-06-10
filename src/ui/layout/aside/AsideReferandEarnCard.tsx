import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useS3Image } from '../../../hooks';
import Avatar from '../../common/Avatar';

import arrow from '../../assets/arrow.svg';

const Container = styled.div<{ toogled: boolean }>`
  width: 100%;
  background: ${props => props.theme.dark};
  border-radius: 25px 25px 25px 25px;
  padding-bottom: ${props => props.toogled && '20px'};

  > div {
    padding: 20px 15px 0;
    border-radius: 25px 25px 0 0;

    header {
      display: flex;

      strong {
        font-size: 20px;
        font-weight: 900;
        color: #fff;
      }

      div {
          
      }

      button {
        background: none;
        margin-left: 10px;

        img {
          width: 14px;
          transition: transform 0.2s;
          transform: ${props => props.toogled && 'rotate(-90deg)'};
        }
      }
    }
  }

  > button {
    width: 100%;
    background: #000;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    padding: 15px 0;
    box-shadow: 0 3px 6px #00000029;
    border-radius: 0 0 25px 25px;
  }

  section {
    padding: 15px 0;
  }
`;

interface Props {
  title: string;
  data: any[];
}

const AsideReferandEarnCard: React.FC<Props> = ({ title, data }) => {
  const [toogled] = useState(true);
  const router = useRouter();
//   const avatar = useS3Image(hash, 'thumbSmall');

  return (
    <>
      <Container toogled={toogled}>
        <div>
          <header>
            <strong>{title}</strong>
            <button onClick={() => router.push('/referandearn')}>
              <img src={arrow} alt="toogle" />
            </button>
          </header>
        </div>
      </Container>
    </>
  );
};

export default AsideReferandEarnCard;
