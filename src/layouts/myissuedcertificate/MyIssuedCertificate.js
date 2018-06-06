import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Card, Col, Row, Layout, Alert, message, Button, Menu } from 'antd';
const { Content, Sider, Header } = Layout;
import PropTypes from 'prop-types'
import badget from '../../../public/img/MSFTBadge.png'
import defaultBadget from '../../../public/img/Peony.jpg'
import CertBackground from '../../../public/img/CertBackGround.jpg'
import CertificatePreview from '../../components/CertificatePreview'
import CertificateRevokeButton from '../../components/CertificateRevokeButton'

class MyIssuedCertificate extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      mode: 'default',
      tokenSigners: [],
    }
  }

  onSelectTab = ({key}) => {
    //Get each token's signers when the certificate is clicked
    //var self = this;
    var self = this;
    var tokenId = this.state.tokenIds[key];
    this.contracts.PeonyCertificate.methods.getNumberOfSigners(tokenId).call().then(function(numberOfSigners){
        var promisesSigners = [];
        for(var i = 0 ; i < numberOfSigners ; i++){
          promisesSigners.push(
            self.contracts.PeonyCertificate.methods.getSigner(tokenId, i).call()
          );
        }
        Promise.all(promisesSigners).then(function(signers){
          self.state.tokenSigners[tokenId] = signers;
          console.log("HEY " + JSON.stringify(signers))
          self.setState({
            mode: key
          });
        });
    });
    this.setState({
      mode: key
    });
  }

  lockDownAccount = () => {
    this.contracts.PeonyCertificate.methods.lockAccount().send({from: this.props.accounts[0]});
  }

  renderContent = () => {
    const { mode, tokenURIs } = this.state;
    var d = new Date();
    if (mode != 'default') {
      var tokenId = this.state.tokenIds[mode];
      var tokenURI = this.state.tokenURIs[mode];
      var tokenExpTime = this.state.tokensExpTime[mode];
      // var tokenSigners = [];
      // if(this.state.tokenSigners[tokenId]){
      //   console.log("Signers: "+ JSON.stringify(this.state.tokenSigners[tokenId]));
      //   tokenSigners = this.state.tokenSigners[tokenId];
      // }else{
      //   tokenSigners=[];
      // }
      return( 
              <div>
              <CertificateRevokeButton tokenId={tokenId}/>
              <CertificatePreview tokenId={tokenId} tokenURI={tokenURI} tokenExpTime={tokenExpTime} tokenSigners={this.state.tokenSigners[tokenId]}/>
              </div>
            );
      } else {
      return (<div></div>);
    }

  }

  render() {
    const { account, payroll, web3 } = this.props;

    var self = this;
    var tokenIds = [];
    var tokenURIs = [];
    var menuItems = [];
    // console.log("!");
    // var temp;
    
    // temp = this.contracts.PeonyCertificate.methods.debug().call().then(function(err, accs) {
    //   temp = accs;
    // });
    // console.log(temp);
    // console.log("@");
    this.contracts.PeonyCertificate.methods.getTotalIssuedTokens(self.props.accounts[0]).call().then(function(balance){
        
        var promises = [];
        for (var i = 0 ; i < balance ; i++) {
           promises.push( self.contracts.PeonyCertificate.methods.tokenOfIssuerByIndex(self.props.accounts[0], i).call());
        }
        var promisesURI = [];
        var promisesExpTime = [];

        Promise.all(promises).then(function(values) {
          // console.log(values);
          values.forEach(function(v) {
            // console.log(v+"called");
            promisesURI.push( self.contracts.PeonyCertificate.methods.tokenURI(v).call());
            promisesExpTime.push(self.contracts.PeonyCertificate.methods.GetExpirationTimeByTokenId(v).call());
          });
          Promise.all(promisesURI).then(function(uris){
              // console.log(tokenURIs);
              // console.log(uris);
              self.state.tokenIds = values;
              self.state.tokenURIs = uris;
              // generate data for menu
              for (var i = 0; i < balance; i++) {
                
                menuItems.push(<Menu.Item key={i}>{values[i]}</Menu.Item>);
              }
              self.state.menuItems = menuItems;
           });

           Promise.all(promisesExpTime).then(function(expTimes){
              self.state.tokensExpTime = expTimes;
           });
        });
    }); 
    this.contracts.PeonyCertificate.methods.isAccountLocked().call().then(function(locked){
      self.state.isAccountLocked = locked;
    });
    return (
      <Layout style={{ padding: '24px 24px', background: '#fff' }}>
                 
        <Content style={{ padding: '0 50px', minHeight: 280 }}>
          <div className="pure-u-1-1">
            <h2>Issued Certificates</h2>
            <p>You have issued <ContractData hideIndicator="true" contract="PeonyCertificate" method="balanceOf"  methodArgs={[this.props.accounts[0]]} /> certificates</p>
            <div>
              <Button type="danger"
                onClick={this.lockDownAccount}
                disabled={this.state.isAccountLocked}
              > Lock Account!!!</Button>
              <h3 hidden={!this.state.isAccountLocked} style={{color: 'red'}}>This Account Has Been Locked!!</h3>
            </div>
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

MyIssuedCertificate.contextTypes = {
  drizzle: PropTypes.object
}

export default MyIssuedCertificate