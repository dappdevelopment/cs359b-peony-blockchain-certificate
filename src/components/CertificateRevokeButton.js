import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Layout, Alert, message, Button, Menu } from 'antd';

/*
 * Create component.
 */

class CertificateRevokeButton extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
        tokenId: this.props.tokenId, 
        buttonText: "Revoke This Certificate"
    };
    this.handleClick = this.handleClick.bind(this);
    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts["PeonyCertificate"].abi;

    this.isRevokedKey = this.contracts["PeonyCertificate"].methods["isCertificateRevokedByIssuer"].cacheCall(this.state.tokenId);
    this.revokableKey = this.contracts["PeonyCertificate"].methods["isCertificateRevokable"].cacheCall(this.state.tokenId);
  }

  handleClick() {
    this.contracts["PeonyCertificate"].methods["revokeCertificate"].cacheSend(this.state.tokenId);
  }

  componentWillReceiveProps(nextProps) {
    //console.log("Received new props");
    if(this.state.tokenId != nextProps.tokenId){
        this.setState({ 
            tokenId : nextProps.tokenId
        });
        this.isRevokedKey = this.contracts["PeonyCertificate"].methods["isCertificateRevokedByIssuer"].cacheCall(this.state.tokenId);
        this.revokableKey = this.contracts["PeonyCertificate"].methods["isCertificateRevokable"].cacheCall(this.state.tokenId);    
    }
  }

  render() {
    // Contract is not yet intialized.

    var buttonEnable =false;
    var buttonText = "Revoke This Certificate"
    if(!this.props.contracts["PeonyCertificate"].initialized) {
        buttonEnable = false;
    }
    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    else if(!(this.isRevokedKey in this.props.contracts["PeonyCertificate"]["isCertificateRevokedByIssuer"]) ||
    !(this.revokableKey in this.props.contracts["PeonyCertificate"]["isCertificateRevokable"]) ) {
        buttonEnable = false;
    } else{
        var revokableData = this.props.contracts["PeonyCertificate"]["isCertificateRevokable"][this.revokableKey].value;
        //console.log("TokenID: "+ this.state.tokenId + " is revokable: " + revokableData);
        if(!revokableData){
            buttonText = "This certificate is not revokable!"
            buttonEnable = false;
        }else{
            var isRevokedData = this.props.contracts["PeonyCertificate"]["isCertificateRevokedByIssuer"][this.isRevokedKey].value;
            if(isRevokedData){
                buttonText = "Already Revoked!";
                buttonEnable = false;
            } else{
                buttonEnable = true;
            }
        }
    }
    return (
        <Button type="danger"
            onClick={this.handleClick}
            disabled={!buttonEnable}
        > {buttonText} </Button>
    )
  }
}

CertificateRevokeButton.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(CertificateRevokeButton, mapStateToProps)