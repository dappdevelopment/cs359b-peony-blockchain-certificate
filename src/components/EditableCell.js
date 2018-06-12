import { drizzleConnect } from 'drizzle-react'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { Input, Icon, Button } from 'antd';

const ButtonGroup = Button.Group;

const Search = Input.Search;
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import _ from 'underscore'
import SignForm from './SignForm'
import CertificatePreview from './CertificatePreview'

class EditableCell extends React.Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      value: this.props.value,
      editable: false,
      showResults: false,
      signerName: [],
      signerAddr: [],
      signerSignature: [],
      signerDateSigned: [],
      numberOfSigner: "",
      isSigner: false, 
      accountsAddr: this.props.accountsAddr,
      signornot: false,
      submitted: false,
      tokenId : '',
      tokenURI : '',
      tokenExpTime : '',
      tokenSigners : '',
      tokenSigner: '',
      tokenRevoked: ''
    }
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }

  
  renderResult = () => {
    if (this.state.showResults) {
      var tokenSigners = [
        {
          name: "Hans Wang",
          signature: "CW",
          address: "0x0123",
          dateSigned: Date.now()
        }
      ];
      // if (this.state.tokenURI == '') this.state.tokenURI = <ContractData contract="PeonyCertificate" method="tokenURI" methodArgs={[this.state.value]}/>;
      // if (this.state.tokenExpTime == '') this.state.tokenExpTime = <ContractData contract="PeonyCertificate" method="GetExpirationTimeByTokenId" methodArgs={[this.state.value]}/>;
      // console.log("JSON " + this.state.tokenURI)
      // console.log("expTime "+ this.state.tokenExpTime)
      // if (this.state.tokenId != '' && this.state.tokenURI != '' && this.state.tokenExpTime != '') {
        return (
          // <div>
          //   True value : {this.state.value}
          // <ContractData contract="PeonyCertificate" method="tokenURI" methodArgs={[this.state.value]}/>
          // <p></p>
          // <p>Issued By:  </p>
          // <ContractData contract="PeonyCertificate" method="GetIssuerAddressByTokenId" methodArgs={[this.state.value]}/>
          // </div>
          
         <div style={{display: 'flex', justifyContent: 'center'}}>
          <div><CertificatePreview tokenId={this.state.value} tokenURI={this.state.tokenURI} tokenExpTime={this.state.tokenExpTime} tokenSigners={this.state.tokenSigner} revoked={this.state.tokenRevoked}/></div>
         </div>
        );
      // } else {
        // return (
          // <div/>
        // );
      // }
    } else {
      this.state.showResults = true;
      return (
        <div/>
      );
    }
  }





  startSearch = () => {
    this.state.showResults = false;
    this.state.isSigner = false;
  }

  setSign = () => {
    this.state.signornot = true;
    this.state.submitted = true;
  }

  setNotSign = () => {
    //this.state.signornot = false;
    this.setState({
      signornot: false
    });
  }

  setSubmitted = () => {
    this.state.submitted = true;
  }

  signerDiv = () => {
    console.log(this.state.signornot)
    if (this.state.isSigner && !this.state.submitted) {
      return (
        <div className="pure-u-1-1 header">
          <h4>There is a pending signature request. Do you want to sign it now?</h4>
          <ButtonGroup>
          <Button onClick={this.setSign}>Sign</Button>
          
          </ButtonGroup>
        </div>
      );
    } else {
      return (
        <div></div>
      ); 
    }
  }


  signCertificate = () => {
    if (this.state.submitted && this.state.signornot) {
      return (
        
        <SignForm hideIndicator="true" contract="PeonyCertificate" method="signCertificate"  labels={['tokenId', 'signature', 'dateSigned']} tokenId={this.state.value} accountsAddr={this.state.accountsAddr}/>
      
      );
    } else {
      return (
        <div></div>
      ); 
    }
  }


  resetState = () => {
    this.state = {
      value: this.props.value,
      editable: false,
      showResults: false,
      signerName: [],
      signerAddr: [],
      signerSignature: [],
      signerDateSigned: [],
      numberOfSigner: "",
      isSigner: false, 
      accountsAddr: this.props.accountsAddr,
      signornot: false,
      submitted: false,
    }
  }
  

  render() {
    const { value, editable } = this.state;
    var self = this;
    var signerName = [];
    var signerAddr = [];
    var signerSignature = [];
    var signerDateSigned = [];
    var promisesExpTime = [];
    console.log("isSigner " + this.state.isSigner)
    if (this.state.value != this.props.value) {
      this.contracts.PeonyCertificate.methods.tokenURI(value).call().then(function(v){
        self.state.tokenURI = v
      });
      this.contracts.PeonyCertificate.methods.GetExpirationTimeByTokenId(value).call().then(function(v){
        self.state.tokentokenExpTimeURI = v
      });
      this.contracts.PeonyCertificate.methods.isCertificateRevokedByIssuer(value).call().then(function(v){
        self.state.tokenRevoked = v;
      });


      this.contracts.PeonyCertificate.methods.getNumberOfSigners(value).call().then(function(numberSigner){
        var signer = [];
        self.state.numberOfSigner = numberSigner;
        for (var i = 0 ; i < numberSigner ; i++) {
          signer.push( self.contracts.PeonyCertificate.methods.getSigner(value, i).call());
        }
        
        Promise.all(signer).then(function(values) {
          self.state.tokenSigner = values;
          values.forEach(function(v) {
            signerName.push(v.name);
            signerAddr.push(v.signerAddress);
            signerSignature.push(v.signature);
            signerDateSigned.push(v.dateSigned);
          });
          Promise.all(signerDateSigned).then(function(signerdatesigned){
              self.state.signerDateSigned = signerdatesigned;
          });
          Promise.all(signerName).then(function(signername){
            self.state.signerName = signername;
            console.log(self.state.signerName)
          });
          Promise.all(signerAddr).then(function(signeraddr){
            self.state.signerAddr = signeraddr;
            console.log(self.state.signerAddr)
            if (!self.state.isSigner) {
              for (var i = 0; i < self.state.numberOfSigner; i++) {
                if (self.state.signerAddr[i] == self.state.accountsAddr) {
                  self.setState({ isSigner: true });
                  console.log("I'm signer")
                  break
                }
              }
            }
          });
          Promise.all(signerSignature).then(function(signersignature){
            self.state.signerSignature = signersignature;
          });
        });
      });
    }




    return (
      <div className="editable-cell">
        
          
            <div className="pure-u-1-1 header" >
            <Search
              placeholder="input certificate ID"
              onSearch={value => { this.resetState();this.setState({value}); this.startSearch(); }}
              enterButton
              
              style={{ width: '200px'}}
            />
              {/* <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                
              /> */}
              {/* <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              /> */}
            </div>
            {/* : */}
            <div>
              {/* {value || ' '} */}
              {/* <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              /> */}
              
            {
              this.renderResult()
            }
            {
              this.signerDiv()
            }
            
            {
              this.signCertificate()
            }
            
            
            </div>
        
      </div>
    );
  }
}

EditableCell.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

// const mapStateToProps = state => {
//   return {
//     contracts: state.contracts
//   }
// }

// export default drizzleConnect(EditableCell, mapStateToProps)
export default EditableCell
