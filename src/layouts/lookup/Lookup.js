import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Card, Col, Row, Layout, Alert, message, Button } from 'antd';
import PropTypes from 'prop-types'


class Lookup extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    this.checkEmployee();
  }

  checkEmployee = () => {
  }

  getPaid = () => {
  }

  renderContent() {
    return (
      <div>
        <h2>To do!!!!!</h2>
      </div>
    );
  }

  render() {
    const { account, payroll, web3 } = this.props;

    return (
      <Layout style={{ padding: '24px 24px', background: '#fff' }}>
        {/* <Common account={account} payroll={payroll} web3={web3} />
        <h2>个人信息</h2> */}
        <div className="pure-u-1-1">
          <h2>To do!!!!!</h2>
        </div>
        {/* {this.renderContent()} */}
      </Layout >
    );
  }
}


Lookup.contextTypes = {
  drizzle: PropTypes.object
}

export default Lookup