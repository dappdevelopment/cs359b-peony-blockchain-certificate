import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Card, Col, Row, Layout, Alert, message, Button } from 'antd';
import PropTypes from 'prop-types'

class MyCertificate extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
    }
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
    this.contracts.PeonyCertificate.methods.balanceOf(self.props.accounts[0]).call().then(function(balance){
        var promises = [];
        for(var i = 0 ; i < balance ; i++){
           promises.push( self.contracts.PeonyCertificate.methods.tokenOfOwnerByIndex(self.props.accounts[0], i).call());
        }
        var promisesURI = [];

        Promise.all(promises).then(function(values) {
          //console.log(values);
          values.forEach(function(v){
            //console.log(v+"called");
            promisesURI.push( self.contracts.PeonyCertificate.methods.tokenURI(v).call());
          });
          Promise.all(promisesURI).then(function(uris){
            //console.log(tokenIds);
            //console.log(uris);
              self.state.tokenIds = values.join(', ');
              self.state.tokenURIs = uris.join(', ');
           });
        });
    }); 
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
          <p>
          <strong>Details</strong>
          <br/><br/>
          {this.state.tokenIds}
          <br/><br/>
          {this.state.tokenURIs}
          </p>
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