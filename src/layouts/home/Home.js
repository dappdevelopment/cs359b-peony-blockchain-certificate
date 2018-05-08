import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../peonyLogo.png'
import PropTypes from 'prop-types'


import getWeb3 from '../../util/web3/getWeb3'

import { Layout, Menu, Spin, Alert } from 'antd';

import IssueCertificate from '../issuecertificate/IssueCertificate';
import MyCertificate from '../mycertificate/MyCertificate';
import Lookup from '../lookup/Lookup';

import IssueCertificateContainer from '../issuecertificate/IssueCertificateContainer';
import MyCertificateContainer from '../mycertificate/MyCertificateContainer';
import LookupContainer from '../lookup/LookupContainer';

import 'antd/dist/antd.css';
import '../../App.css';

const { Header, Content, Footer } = Layout;

class Home extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      mode: 'Lookup'
    } 
  }

  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }

  renderContent = () => {

    const { mode } = this.state;

    switch(mode) {
      case 'IssueCertificate':
        return <IssueCertificateContainer />
      case 'MyCertificate':
        return <MyCertificateContainer />
      case 'Lookup':
        return <LookupContainer />
      default:
        return <LookupContainer />
    }
  }


  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={logo} alt="drizzle-logo" width="200px"/>
            <h1>Peony</h1>
            <div>
              <p>Total Active Certificate Powered By Peony:<ContractData contract="PeonyCertificate" method="totalSupply"/></p>
            </div>
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
                defaultSelectedKeys={['Lookup']}
                style={{ lineHeight: '64px' }}
                onSelect={this.onSelectTab}
              >
                <Menu.Item key="Lookup">Look up</Menu.Item>
                <Menu.Item key="IssueCertificate">Create New Certificate</Menu.Item>
                <Menu.Item key="MyCertificate">View My Certificate</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
              <Layout style={{ padding: '24px 0', background: '#fff', minHeight: '600px' }}>
                {this.renderContent()}
                {/* {console.log(this)} */}
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

Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home
