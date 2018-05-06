import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../peonyLogo.png'


//import PayrollContract from '../build/contracts/Payroll.json'
import getWeb3 from '../../util/web3/getWeb3'

import { Layout, Menu, Spin, Alert } from 'antd';

import Employer from '../../components/Employer';
import Employee from '../../components/Employee';
import Lookup from '../../components/Lookup';

import 'antd/dist/antd.css';
import '../../App.css';

const { Header, Content, Footer } = Layout;




class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      mode: 'employer'
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      //this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  // instantiateContract() {
  //   /*
  //    * SMART CONTRACT EXAMPLE
  //    *
  //    * Normally these functions would be called in the context of a
  //    * state management library, but for convenience I've placed them here.
  //    */

  //   const contract = require('truffle-contract')
  //   const Payroll = contract(PayrollContract)
  //   Payroll.setProvider(this.state.web3.currentProvider)

  //   // Declaring this for later so we can chain functions on Payroll.
  //   var PayrollInstance

  //   // Get accounts.
  //   this.state.web3.eth.getAccounts((error, accounts) => {
  //     this.setState({
  //       account: accounts[0],
  //     });
  //     Payroll.deployed().then((instance) => {
  //       PayrollInstance = instance
  //       this.setState({
  //         payroll: instance
  //       });
  //     })
  //   })
  // }

  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }

  GetAllCertificate = () => {
    //var drizzle = new Drizzle(drizzleOptions, store);
    var length = <ContractData contract="PeonyCertificate" method="balanceOf"  methodArgs={[this.props.accounts[0]]}/>;
    console.log(length)
    // var lenth = self.props.contract.totalSupply;
    //var length = this.props.drizzleStatus.initialized ? 'come on': 'oops';
    // console.log(length);
    return length;
  }


  renderContent = () => {
    const { account, payroll, web3, mode } = this.state;

    // if (!payroll) {
    //   return <Spin tip="Loading..." />;
    // }
    
    
    

    switch(mode) {
      case 'employer':
        return <Employer account={account} payroll={payroll} web3={web3} />
      case 'employee':
        return <Employee account={account} payroll={payroll} web3={web3} first_acc={[this.props.accounts[0]]}/>
      case 'lookup':
        return <Lookup account={account} payroll={payroll} web3={web3} />
      default:
        return <Alert message="请选一个模式" type="info" showIcon />
    }
  }


  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" width="200px"/>
            <h1>Peony</h1>

            <br/><br/>
          </div>
        
          <div className="pure-u-1-1" hidden>
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1" hidden>
            <h2>SimpleStorage</h2>
            <p>This shows a simple ContractData component with no arguments, along with a form to set its value.</p>
            <p><strong>Stored Value</strong>: <ContractData contract="SimpleStorage" method="storedData" /></p>
            <ContractForm contract="SimpleStorage" method="set" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1" hidden>
            <h2>TutorialToken</h2>
            <p>Here we have a form with custom, friendly labels. Also note the token symbol will not display a loading indicator. We've suppressed it with the <code>hideIndicator</code> prop because we know this variable is constant.</p>
            <p><strong>Total Supply</strong>: <ContractData contract="TutorialToken" method="totalSupply" methodArgs={[{from: this.props.accounts[0]}]} /> <ContractData contract="TutorialToken" method="symbol" hideIndicator /></p>
            <p><strong>My Balance</strong>: <ContractData contract="TutorialToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>
            <h3>Send Tokens</h3>
            <ContractForm contract="TutorialToken" method="transfer" labels={['To Address', 'Amount to Send']} />

            <br/><br/>
          </div>

          <div className="pure-u-1-1" hidden>
            <h2>ComplexStorage</h2>
            <p>Finally this contract shows data types with additional considerations. Note in the code the strings below are converted from bytes to UTF-8 strings and the device data struct is iterated as a list.</p>
            <p><strong>String 1</strong>: <ContractData contract="ComplexStorage" method="string1" toUtf8 /></p>
            <p><strong>String 2</strong>: <ContractData contract="ComplexStorage" method="string2" toUtf8 /></p>
            <strong>Single Device Data</strong>: <ContractData contract="ComplexStorage" method="singleDD" />

            <br/><br/>
          </div>


          <div className="pure-u-1-1" hidden>
            <h2>My Peony</h2>
            <p>My Peony Cert I have..</p>
            <p><strong>List</strong>: <ContractData contract="PeonyCertificate" method="balanceOf"  methodArgs={[this.props.accounts[0]]} /></p>
            <br/><br/>
          </div>

          <div className="pure-u-1-1" hidden>
            <h2>Issue My Peony</h2>
            <p>Create new cert!</p>
            <p><strong>List</strong>: <ContractForm contract="PeonyCertificate" method="IssueCertificate"  labels={['To Address', 'Customer Text']} /></p>
            <br/><br/>
          </div>


          {/* {console.log(this)} */}

        </div>
        <Layout>
            <Header className="header">
              <div className="logo">Peony</div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['employer']}
                style={{ lineHeight: '64px' }}
                onSelect={this.onSelectTab}
              >
                <Menu.Item key="employer">Issuer</Menu.Item>
                <Menu.Item key="employee">Receiver</Menu.Item>
                <Menu.Item key="lookup">Look up</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Layout style={{ padding: '24px 0', background: '#fff', minHeight: '600px' }}>
                {this.renderContent()}
                {/* {console.log(this)} */}
                {/* {this.GetAllCertificate()} */}
              </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Peony
            </Footer>
          </Layout>

      </main>
    )
  }
}

export default Home
