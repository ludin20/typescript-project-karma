import React, {Component} from 'react';
import { runSaga } from 'redux-saga';
import Router, { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FormikProvider, FormikProps } from 'formik';
import { Anchor } from 'ual-anchor'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'
import Button from '../common/Button';
import Space from '../common/Space';
import Row from '../common/Row';
import PropTypes from 'prop-types'
import smartphone from '../assets/smartphone.svg';
import Text from '../common/Text';

import { authenticateWithScatter } from '../../store/ducks/auth';
import { authenticateWithWaxCloud } from '../../store/ducks/auth';

import { types, createProfileSuccess, updateProfileSuccess, profileFailure } from '../../store/ducks/user';
import { createProfile, updateProfile } from '../../store/sagas/user';

const Label = styled(Row)`
  span {
    color: #fff;
    font-size: 20px;
  }

  img {
    height: 30px;
  }
`;

const Legend = styled.p`
  width: 100%;

  &:first-child {
    margin: 0 0 10px;
    text-align: center;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
`;

const ScatterButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
  background: #009AFF;
`;

const WaxCloudButton = styled(Button)`
  width: 100%;
  padding: 15px 0;
  font-size: 20px;
  font-weight: 900;
  background: #ff8b1c;
`;

interface Props {
  label: string;
  input: React.ReactNode;
  legend: string | React.ReactNode;
  submitText: string;
  loading: boolean;
  formik: FormikProps<any>;
}

const getActions = (actor, permission, chainId) => {
  const { account, name } = getContractData(chainId)
  const data = getActionData(actor, permission, chainId)
  return {
    actions: [
      {
        account,
        name,
        authorization: [{ actor, permission }],
        data,
      }
    ],
  }
}

class TestApp extends Component {
  static propTypes = {
    ual: PropTypes.shape({
      activeUser: PropTypes.object,
      activeAuthenticator: PropTypes.object,
      logout: PropTypes.func,
      showModal: PropTypes.func,
    }).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      chainId: props.chainId,
      message: '',
    }
  }

  purchase = async () => {
    console.log("++++++++");
    const { ual: { activeUser } } = this.props
    try {
      const { accountName, chainId } = activeUser
      let { requestPermission } = activeUser
      if (!requestPermission && activeUser.scatter) {
        requestPermission = activeUser.scatter.identity.accounts[0].authority
      }
      const demoActions = getActions(accountName, requestPermission, chainId)
      const result = await activeUser.signTransaction(demoActions, { expireSeconds: 120, blocksBehind: 3 })
      this.setState({
        message: `Transfer Successful!`,
      }, () => {
        setTimeout(this.resetMessage, 5000)
      })
      console.info('SUCCESS:', result)
      //Test CreateProfile
      const dispatch = jest.fn();
      await runSaga({ dispatch }, () =>
        createProfile({ type: types.CREATE_PROFILE_REQUEST, payload: { data: activeUser } }),
      ).toPromise();

      expect(dispatch).toHaveBeenCalledWith(createProfileSuccess(activeUser));
      Router.push('/home');
    } catch (e) {
      const dispatch = jest.fn();
      await runSaga({ dispatch }, () =>
        createProfile({ type: types.CREATE_PROFILE_REQUEST, payload: { data: null } }),
      ).toPromise();

      expect(dispatch).toHaveBeenCalledWith(profileFailure());
    }
  }

  resetMessage = () => this.setState({ message: '' })

  renderLoginButton = () => (
    <button type='button' onClick={this.props.ual.showModal} style={styles.button}>
      <p style={{buttonText: styles.buttonText, baseText: styles.baseText}}>Anchor</p>
    </button>
  )

  render() {
    const { ual: { activeUser } } = this.props
    return this.renderLoginButton()
  }
}

class UALWrapper extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    const chain = {
      chainId: 'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
      name: 'WAX (Testnet)',
      rpcEndpoints: [{
        protocol: 'https',
        host: 'waxtestnet.greymass.com',
        port: 443,
      }]
    }
    const anchor = new Anchor([chain], {
      // Required: The name of the app requesting a session
      appName: 'ual-anchor-demo',
      // Optional: define your own endpoint or eosjs JsonRpc client
      // rpc: new JsonRpc('https://jungle.greymass.com'),
      // Optional: define API for session management, defaults to cb.anchor.link
      service: 'https://cb.anchor.link'
    })
    return (
      <UALProvider
        appName='Anchor + Authenticator Test App'
        authenticators={[anchor]}
        chains={[chain]}
        key={chain.chainId}
      >
        <TestAppConsumer />
      </UALProvider>
    )
  }
}

const TestAppConsumer = withUAL(TestApp)

const styles = {
  button: {
    padding: '15px 60px',
    backgroundColor: 'rgb(54, 80, 162)',
    textAlign: 'center',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
  },
  logout: {
    marginTop: 20,
  },
  baseText: {
    color: '#fff',
    fontSize: 18,
  },
}

const JoinCard: React.FC<Props> = ({ label, input, legend, submitText, loading, formik}) => {
  const { isValid } = formik;
  const dispatch = useDispatch();
  const onScatterSign = () => {
    dispatch(authenticateWithScatter());
  };

  const onWaxCloudSign = () => {
    dispatch(authenticateWithWaxCloud());
  };

  return (
    <FormikProvider value={formik}>
      <Space height={30} />
      <Label justify="flex-start">
        <img src={smartphone} alt="smartphone" />
        <Space width={15} />
        <Text color="white" size={13} lineHeight="18px">
          {label}
        </Text>
      </Label>
      <Space height={30} />

      {input}
      <Space height={15} />
      <Legend>
        {typeof legend === 'string' ? (
          <Text color="white" size={13} lineHeight="18px">
            {legend}
          </Text>
        ) : (
          legend
        )}
      </Legend>
      <Space height={30} />

      <SubmitButton loading={loading} background="green" disabled={!isValid || loading} type="submit">
        {submitText}
      </SubmitButton>
      <Space height={20} />
      <WaxCloudButton onClick={onWaxCloudSign}>Wax Cloud Wallet</WaxCloudButton>
      <Space height={20} />
      <UALWrapper />
      {/* <Space height={20} />
      <ScatterButton onClick={() => Router.push('/transfercontent') }>
        Transfer Content
      </ScatterButton> */}
    </FormikProvider>
  );
};
export default JoinCard;
