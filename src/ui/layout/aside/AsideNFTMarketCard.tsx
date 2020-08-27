import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useS3Image } from '../../../hooks';
import NFTAvatar from '../../common/NFTAvatar';

import arrow from '../../assets/arrow.svg';

const Container = styled.div<{ toogled: boolean }>`
  width: 100%;
  background: ${props => props.theme.dark};
  border-radius: 25px 25px 25px 25px;
  padding-bottom: ${props => props.toogled && '10px'};

  > div {
    padding: 10px 15px 0;
    border-radius: 25px 25px 0 0;

    header {
      display: flex;

      strong {
        font-size: 20px;
        font-weight: 900;
        color: #fff;
        line-height: 45px;
      }

      button {
        background: none;
        margin-left: 10px;
        position: relative;

        img.arrow {
          border: none;
          position: absolute;
          left: 290px;
          top: 8px; 
          width: 14px !important;
          transition: transform 0.2s !important;
          transform: ${props => props.toogled && 'rotate(-90deg)'} !important;
          margin-left: 15px !important;
          margin-top: -8px;
        }

        img:nth-child(2) {
          left: 155px;
        }

        img:nth-child(3) {
          left: 205px;
        }

        img:nth-child(4) {
          left: 255px;
        }

        img {
          position: absolute;
          transform: rotate(10deg) !important;
          height: 50px !important;
          width: 50px !important;
          margin-left: -20px !important;
          top: 1px;
        }

        span {
          position: absolute;
          left: 160px;
          width: 170px;
          top: 4px;
          font-size: 16px;
          color: #26cc8b;
          line-height: 40px;
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

const AsideNFTMarketCard: React.FC<Props> = ({ title, data }) => {
  const [toogled] = useState(true);
  const router = useRouter();
//   const avatar = useS3Image(hash, 'thumbSmall');

  return (
    <>
      <Container toogled={toogled}>
        <div>
          <header>            
            <button onClick={() => router.push('/nftmarket')}>
              <strong>{title}</strong>
              {
                data.map((item, index) => (
                  <NFTAvatar online={false} src={item.avatar} alt={name} size="small" />
                ))
              }
              <img class="arrow" src={arrow} alt="toogle" />
            </button>
          </header>
        </div>
      </Container>
    </>
  );
};

export default AsideNFTMarketCard;
