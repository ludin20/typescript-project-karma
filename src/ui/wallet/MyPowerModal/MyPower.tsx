import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { RootState } from '../../../store/modules/rootReducer';

import ModalWrapper, { ModalProps } from '../../common/ModalWrapper';
import Title from '../../common/Title';
import Row from '../../common/Row';
import Space from '../../common/Space';
import Text from '../../common/Text';
import Column from '../../common/Column';
import ModalTabs from '../../tabs/ModalTabs';

import power from '../../assets/power-gradient.svg';

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
`;

const StyledRow = styled(Row)`
  flex: 1;
  padding: 0 20px;
`;

const MyPower: React.FC<ModalProps> = props => {
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
      console.log(values); //eslint-disable-line no-console
      props.close();
    },
  });

  const decreasePowerFormik = useFormik({
    ...commonFormik,
    onSubmit: values => {
      console.log(values); //eslint-disable-line no-console
      props.close();
    },
  });

  const tabs = [
    {
      name: 'Increase Power',
      render: () => PowerForm({ formik: increasePowerFormik, borderColor: 'green' }),
    },
    {
      name: 'Decrease Power',
      render: () => PowerForm({ formik: decreasePowerFormik, borderColor: 'warning' }),
    },
  ];
  const { currentPower, liquidBalance, unstaking } = useSelector((state: RootState) => state.user.profile);

  return (
    <ModalWrapper {...props}>
      <Container>
        <Title size="small" bordered={false}>
          My Power
        </Title>
        <Space height={30} />

        <Row justify="flex-start" align="center">
          <img src={power} alt="my power" />

          <StyledRow justify="flex-start" align="center">
            <Column justify="flex-start" align="center">
              <Text weight="900" size={18}>
                Current Power
              </Text>
              <Space height={8} />

              <Text weight="900" size={20} color="green">
                {currentPower} KARMA
              </Text>
            </Column>
            <Space width={50} />

            <Column justify="flex-start" align="center">
              <Text weight="900" size={18}>
                Liquid Balance
              </Text>
              <Space height={8} />

              <Text weight="900" size={20} color="secondblue">
                {liquidBalance} KARMA
              </Text>
            </Column>
            <Space width={50} />

            <Column justify="flex-start" align="center">
              <Text weight="900" size={18}>
                Unstaking
              </Text>
              <Space height={8} />

              <Text weight="900" size={20} color="warning">
                {unstaking} KARMA
              </Text>
            </Column>
          </StyledRow>
        </Row>
        <Space height={30} />

        <ModalTabs tabs={tabs} />
      </Container>
    </ModalWrapper>
  );
};

export default MyPower;
