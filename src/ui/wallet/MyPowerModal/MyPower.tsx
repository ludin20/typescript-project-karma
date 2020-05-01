import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import graphql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RootState } from '../../../store/ducks/rootReducer';
import { actionRequest, actionSuccess } from '../../../store/ducks/action';

import ModalWrapper, { ModalProps } from '../../common/ModalWrapper';
import Title from '../../common/Title';
import Row from '../../common/Row';
import Space from '../../common/Space';
import Text from '../../common/Text';
import Column from '../../common/Column';
import ModalTabs from '../../tabs/ModalTabs';

import power from '../../assets/power-gradient.svg';
import closeIcon from '../../assets/close-white.svg';

import PowerForm from './PowerForm';

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background: ${props => props.theme.dark};
  padding: 26px 42px;
  border-radius: 20px;

  div > img {
    width: 100px;
    height: 100px;
    margin-right: 40px;
  }

  @media (max-width: 700px) {
    border-radius: 30px 30px 0 0;
    padding: 26px 20px;
    position: fixed;
    bottom: 0;

    div > img {
      width: 52px;
      height: 52px;
      margin-right: 10px;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  position: absolute;
  right: 0;

  img {
    width: 30px;
    height: 30px;
  }
`;

const Header = styled(Row)`
  position: relative;
`;

const StyledText = styled(Text)`
  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

const StyledRow = styled(Row)`
  flex: 1;
  padding: 0 20px;
`;

const SpaceOnMobile = css`
  @media (max-width: 700px) {
    width: 22px;
  }
`;

const POWER_UP = graphql`
  mutation powerUp($amount: String!) {
    powerUp(amount: $amount) {
      success
    }
  }
`;

const POWER_DOWN = graphql`
  mutation powerDown($amount: String!) {
    powerDown(amount: $amount) {
      success
    }
  }
`;

export interface Props extends ModalProps {
  action: string;
  stakedAmount: number;
  balanceAmount: number;
  onChangeAction(action: string): void;
  onRefresh: any;
}

const MyPower: React.FC<Props> = ({ action, stakedAmount, balanceAmount, onChangeAction, onRefresh, ...props }) => {
  const dispatch = useDispatch();
  const [powerUp] = useMutation(POWER_UP, {
    onCompleted: e => {
      onRefresh().then(() => props.close());
    },
  });
  const [powerDown] = useMutation(POWER_DOWN, {
    onCompleted: e => {
      onRefresh().then(() => props.close());
    },
  });

  const commonFormik = {
    enableReinitialize: false,
    initialValues: {
      power: '',
    },
    validationSchema: Yup.object().shape({
      power: Yup.string().required('Amount of power is requires'),
    }),
    validateOnMount: true,
  };

  const increasePowerFormik = useFormik({
    ...commonFormik,
    onSubmit: values => {
      dispatch(actionRequest());
      powerUp({ variables: { quantity: `${parseInt(values.power).toFixed(4)} KARMA` } });
    },
  });

  const decreasePowerFormik = useFormik({
    ...commonFormik,
    onSubmit: values => {
      dispatch(actionRequest());
      powerDown({ variables: { quantity: `${parseInt(values.power).toFixed(4)} KARMA` } });
    },
  });

  const tabs = [
    {
      name: 'Increase Power',
      action: 'up',
      active: action === 'up',
      render: () => PowerForm({ formik: increasePowerFormik, borderColor: 'green' }),
    },
    {
      name: 'Decrease Power',
      action: 'down',
      active: action !== 'up',
      render: () => PowerForm({ formik: decreasePowerFormik, borderColor: 'warning' }),
    },
  ];

  return (
    <ModalWrapper {...props} justify="center" withoutBackgroundOnMobile>
      <Container>
        <Header>
          <Title size="small" bordered={false}>
            My Power
          </Title>

          <CloseButton onClick={() => props.close()}>
            <img src={closeIcon} alt="close" />
          </CloseButton>
        </Header>
        <Space height={25} />

        <Row justify="flex-start" align="center">
          <img src={power} alt="my power" />

          <StyledRow justify="flex-start" align="center">
            <Column justify="flex-start" align="center">
              <StyledText weight="900" size={18}>
                Current Power
              </StyledText>
              <Space height={8} />

              <StyledText weight="900" size={20} color="green">
                {stakedAmount} KARMA
              </StyledText>
            </Column>
            <Space width={50} css={SpaceOnMobile} />

            <Column justify="flex-start" align="center">
              <StyledText weight="900" size={18}>
                Liquid Balance
              </StyledText>
              <Space height={8} />

              <StyledText weight="900" size={20} color="secondblue">
                {balanceAmount && balanceAmount.toFixed()} KARMA
              </StyledText>
            </Column>
            <Space width={50} css={SpaceOnMobile} />

            <Column justify="flex-start" align="center">
              <StyledText weight="900" size={18}>
                Unstaking
              </StyledText>
              <Space height={8} />

              <StyledText weight="900" size={20} color="warning">
                {stakedAmount} KARMA
              </StyledText>
            </Column>
          </StyledRow>
        </Row>
        <Space height={25} />

        <ModalTabs tabs={tabs} onChangeTab={onChangeAction} />
      </Container>
    </ModalWrapper>
  );
};

export default MyPower;
