import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Layout, Menu, Alert } from 'antd';

import PropTypes from 'prop-types'

const { Content, Sider } = Layout;

class IssueCertificate extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
  }

  // componentDidMount() {
  //   const { account, payroll } = this.props;
  //   payroll.owner.call({
  //     from: account
  //   }).then((result) => {
  //     this.setState({
  //       owner: result
  //     });
  //   })
  // }

  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }

  render() {
    return (
      <Layout style={{ padding: '24px 24px', background: '#fff'}}>
        <div className="pure-u-1-1">
          <h2>Issue My Peony</h2>
          <p>Create new cert!</p>
          {/* <p><strong>List</strong>: <ContractForm contract="PeonyCertificate" method="IssueCertificate"  labels={['To Address', 'Customer Text']} /></p> */}
          <p><strong></strong><ContractForm contract="PeonyCertificate" method="IssueCertificate"  labels={['To Address', 'Customer Text']} /></p>
          <br/><br/>
        </div>
        {/* <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {this.renderContent()}
        </Content> */}
      </Layout>
      
      
    );
  }
}

IssueCertificate.contextTypes = {
  drizzle: PropTypes.object
}

export default IssueCertificate