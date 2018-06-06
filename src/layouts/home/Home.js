import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
// import logo from '../../peonyLogo.png'
// if we ever change to a non-white background
import logo from '../../peony_logo_white_background.png'

import PropTypes from 'prop-types'


import getWeb3 from '../../util/web3/getWeb3'

import { Layout, Menu, Spin, Alert } from 'antd';

import IssueCertificate from '../issuecertificate/IssueCertificate';
import MyCertificate from '../mycertificate/MyCertificate';
import Lookup from '../lookup/Lookup';
import MyIssuedCertificate from '../myissuedcertificate/MyIssuedCertificate'

import IssueCertificateContainer from '../issuecertificate/IssueCertificateContainer';
import MyCertificateContainer from '../mycertificate/MyCertificateContainer';
import LookupContainer from '../lookup/LookupContainer';
import MyIssuedCertificateContainer from '../myissuedcertificate/MyIssuedCertificateContainer';

import 'antd/dist/antd.css';
import '../../App.css';
// import IntroPage from '../../../public/intro/index.html';
// var IntroDoc =  {__html: IntroPage};

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
      case 'ViewIssuedCertificate':
        return <MyIssuedCertificateContainer/>
      default:
        return <LookupContainer />
    }
  }


  render() {
    return (
      <main className="container">
        <div className="pure-g" hidden>
          <div className="pure-u-1-1 header">
            <img src={logo} alt="peony-logo" width="200px"/>
            <h1>Peony</h1>
            <div>
              <p>Total Active Certificate Powered By Peony: <ContractData contract="PeonyCertificate" method="totalSupply"/></p>
            </div>
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
                <Menu.Item key="ViewIssuedCertificate">Issued Certificate</Menu.Item>
                <Menu.Item key="MyCertificate">View My Certificate</Menu.Item>
                <Menu.Item key="Intro"><a href="./intro/index.html" target='_blank'>Who Are We</a></Menu.Item>
                
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
