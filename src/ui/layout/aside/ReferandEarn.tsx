import React from 'react';
import styled from 'styled-components';

import { referandearn } from '../../../mock';

import AsideReferandEarnCard from './AsideReferandEarnCard';

const Container = styled.div``;

interface Props {
  data: Array<any>;
}

const ReferandEarn: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <AsideReferandEarnCard title="Refer & Earn" data={referandearn} />
    </Container>
  );
};

export default ReferandEarn;
