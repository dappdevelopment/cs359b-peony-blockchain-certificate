import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Card, Col, Row, Layout, Alert, message, Button } from 'antd';
import PropTypes from 'prop-types'

class MyCertificate extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
  }

  render() {
    const { account, payroll, web3 } = this.props;

    return (
      <Layout style={{ padding: '24px 24px', background: '#fff' }}>
        {/* <Common account={account} payroll={payroll} web3={web3} />
        <h2>个人信息</h2> */}
        <div className="pure-u-1-1">
          <h2>My Peony</h2>
          <p>You have 
          {/* <p><strong>List</strong>: <ContractData contract="PeonyCertificate" method="balanceOf"  methodArgs={this.props.first_acc} /></p> */}
          <strong></strong> <ContractData contract="PeonyCertificate" method="balanceOf"  methodArgs={[this.props.accounts[0]]} /> certificate.</p>
          
          <br/><br/>
        </div>
      </Layout >
    );
  }
}

MyCertificate.contextTypes = {
  drizzle: PropTypes.object
}

export default MyCertificate