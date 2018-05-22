import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Card, Col, Row, Layout, Alert, message, Button, Menu } from 'antd';
const { Content, Sider, Header } = Layout;
import PropTypes from 'prop-types'

class MyCertificate extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      mode: 'default'
    }
  }

  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }


  renderContent = () => {
    const { mode, tokenURIs } = this.state;
    if (mode != 'default') {
      // var sp = tokenURIs.split(", ");
      // var tokenId = tokenIds.split(", ");
      return( 
                <div>
                <div>Token Id: {this.state.tokenIds[mode]}</div>
                <div>Content: {this.state.tokenURIs[mode]}</div>
                <div>Issuer: <ContractData contract="PeonyCertificate" method="GetIssuerAddressByTokenId" methodArgs={this.state.tokenIds[mode]}/></div>
                <div>Expiration Time: <ContractData contract="PeonyCertificate" method="GetExpirationTimeByTokenId" methodArgs={this.state.tokenIds[mode]}/></div>
                <div>Is the Certificate Valid: <ContractData contract="PeonyCertificate" method="isCertificateValid" methodArgs={this.state.tokenIds[mode]}/></div>                 
                </div>
            );
            // this doens't work right now
            // <div>Is the Certificate Valid:</div>
            // <div>Is the Certificate Valid: <ContractData contract="PeonyCertificate" method="isCertificateValid" methodArgs={this.state.tokenIds[mode]}/></div>
    } else {
      return (<div>Click contarct id to view its name here...</div>);
    }
    // switch(mode) {
    //   case '1':
    //     // return <Fund account={account} payroll={payroll} web3={web3} />
       
    //   case '2':
    //     // return <EmployeeList account={account} payroll={payroll} web3={web3} />
    //     return <div>{this.state.tokenURIs[1]}</div>
    //   case 'default':
    //     return <div>you have no certificate!!!!!!</div>
    // }
  }

  render() {
    const { account, payroll, web3 } = this.props;
    // var dataKey = this.contracts.PeonyCertificate.methods.balanceOf.cacheCall([this.props.accounts[0]]);
    // console.log(dataKey);
    // if(!(dataKey in this.props.PeonyCertificate.balanceOf)) {
    //  console.log("Waiting...");
    //  console.log(this.props);
    // }else{
    //   console.log(this.props);
    //   console.log(this.props.PeonyCertificate.balanceOf[dataKey].value);  
    
    // }
    var self = this;
    var tokenIds = [];
    var tokenURIs = [];
    var menuItems = [];
    console.log("!");
    var temp;
    
    temp = this.contracts.PeonyCertificate.methods.debug().call().then(function(err, accs) {
      temp = accs;
    });
    console.log(temp);
    console.log("@");
    this.contracts.PeonyCertificate.methods.balanceOf(self.props.accounts[0]).call().then(function(balance){
        
        var promises = [];
        for (var i = 0 ; i < balance ; i++) {
           promises.push( self.contracts.PeonyCertificate.methods.tokenOfOwnerByIndex(self.props.accounts[0], i).call());
        }
        var promisesURI = [];

        Promise.all(promises).then(function(values) {
          // console.log(values);
          values.forEach(function(v) {
            // console.log(v+"called");
            promisesURI.push( self.contracts.PeonyCertificate.methods.tokenURI(v).call());
          });
          Promise.all(promisesURI).then(function(uris){
              // console.log(tokenIds);
              // console.log(uris);
              self.state.tokenIds = values;
              self.state.tokenURIs = uris;

              // generate data for menu
              for (var i = 0; i < balance; i++) {
                menuItems.push(<Menu.Item key={i}>{values[i]}</Menu.Item>);
              }
              self.state.menuItems = menuItems;
           });
        });
    }); 
    
    return (
      <Layout style={{ padding: '24px 24px', background: '#fff' }}>
                 
        <Content style={{ padding: '0 50px', minHeight: 280 }}>
          <div className="pure-u-1-1">
            <h2>My Peony</h2>
            <p>You have 
            <strong></strong> <ContractData contract="PeonyCertificate" method="balanceOf"  methodArgs={[this.props.accounts[0]]} /> certificate. (for now showing contract id)</p>
          </div>
          {<Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['fund']}
              style={{ height: '100%' }}
              onSelect={this.onSelectTab}
            >
              {self.state.menuItems}
              {/* <Menu.Item key="fund">Contract 1</Menu.Item>
              <Menu.Item key="employees">Contract 2</Menu.Item> */}
            </Menu>
          </Sider>}
          
        </Content>
        
        
        <Content style={{ padding: '50px 24px', minHeight: 280 }}>
            {this.renderContent()}
        </Content>
        {/* {<div className="pure-u-1-1">
          <h2>My Peony</h2>
          <p>You have 
          <strong></strong> <ContractData contract="PeonyCertificate" method="balanceOf"  methodArgs={[this.props.accounts[0]]} /> certificate.</p>
          <br/><br/>
          <p>
          <strong>Details</strong>
          <br/><br/>
          {this.state.tokenIds}
          {this.state.tokenURIs}
          </p>
          <br/><br/>
        </div> } */}
      </Layout >
    );
  }
}

MyCertificate.contextTypes = {
  drizzle: PropTypes.object
}

export default MyCertificate