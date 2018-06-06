import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
var web3 = require('web3');
import { Input } from 'antd';
const { TextArea } = Input;
import { Radio } from 'antd';
import defaultBadget from '../../public/img/Peony.jpg'
import CertBackground from '../../public/img/CertBackGround.jpg'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'


/*
 * Create component.
 */

class CertificatePreview extends Component {
  constructor(props, context) {
    super(props);
    this.contracts = context.drizzle.contracts;
    this.state = {
        tokenId : this.props.tokenId,
        tokenURI : this.props.tokenURI,
        tokenExpTime : this.props.tokenExpTime,
        tokenSigners : this.props.tokenSigners, // this needs to be an array of JSON: 
        revoked: this.props.revoked
        /*
        {
        name: "name",
        address: "address",
        signature: "signature",
        dateSigned : 123<in unix>;
        }
        */
    };
  }
  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }

  lockDownAccount = () => {
    this.contracts.PeonyCertificate.methods.lockAccount().send({from: this.props.accounts[0]});
  }

  componentWillReceiveProps(nextProps) {
    //console.log("Received new props");
    this.setState({ 
      tokenId : nextProps.tokenId,
      tokenURI : nextProps.tokenURI,
      tokenExpTime : nextProps.tokenExpTime,
      tokenSigners : nextProps.tokenSigners 
    });
  }
  
  render() {
    
    var d = new Date();
    var obj = JSON.parse(this.state.tokenURI);
    var signerNames = [];
    var signerSignartures = [];
    var signerAddrs = [];
    //console.log("Signer in preview: "+JSON.stringify(this.state.tokenSigners));
    if(this.state.tokenSigners){
      this.state.tokenSigners.forEach(function(c, index){
        var date = new Date(parseInt(c.dateSigned));
        //console.log(date);
        var dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
        signerNames.push(<td key={index+"_Signer_Name"}>{c.name}</td>);
        signerSignartures.push(<td key={index+"_Signer_Signature"}><i>{c.signature}</i>{' '+dateString}</td>);
        signerAddrs.push(c.address);
      });
    }
    //console.log("Preview Id: "+ this.state.tokenId);
    return( 
      <div>
      <div>Token Id: {this.state.tokenId}</div>
      <div>Recipient Address: {obj.address}</div>
      <div>Recipient Name: {obj.recipientName}</div>
      <div>Certificate Title: {obj.title}</div>
      <div>Certificate Content: {obj.body}</div>
      <div>Background Image Url: {obj.bckgrdImg}</div>
      <div>Badge Image Url: {obj.bdgImg}</div>
      <div>Issuer Address: <ContractData hideIndicator="true" contract="PeonyCertificate" method="GetIssuerAddressByTokenId" methodArgs={this.state.tokenId}/></div>
      <div hidden={this.state.tokenExpTime == 0} >Expiration Time: {this.state.tokenExpTime}</div>
      <h3 hidden={this.state.tokenExpTime == 0 || Date.now() <= this.state.tokenExpTime} style={{color: 'red'}}>This Certificate Is Expired!!</h3>
      <h3 hidden={this.state.revoked == 0} style={{color: 'red'}}>This certifecate is revoked.</h3>
      <br/>
      <br/>
      <div id="Certificate Shot" style={{width:'800px',height:'566px',padding: "30px 30px 30px 30px",backgroundImage: `url(${CertBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div id="Certificate Paper" style={{padding: "50px 50px 50px 50px", horizontalAlign: "middle", verticalAlign: "middle"}}>
          <table style={{width: '700', height: '466px' , horizontalAlign: "middle"}}>
            <tr>
              <table style={{width: '500px', verticalAlign: "top"}} id="Top">
                <th><img src={obj.bdgImg} width="150px" style={{padding: "10px 10px 10px 10px", display: 'inline-block'}} onError={(e)=>{e.target.src=defaultBadget}}/></th>
                <th style={{align: 'top'}} >
                  <div style={{align: 'top'}}>
                  <div>{obj.title}</div>
                  <div>Dear {obj.recipientName},</div>
                  {/* <div>Recipient Address: {obj.address}</div> */}
                  <div>Certificate content: {obj.body}</div>
                  <div>Issuer: Stanford (Address:<ContractData hideIndicator="true" contract="PeonyCertificate" method="GetIssuerAddressByTokenId" methodArgs={this.state.tokenId}/>)</div>
                  </div>
                </th>
              </table>
            </tr>
            <tr></tr>
            <tr>
              <td>
                {obj.body}
              </td>
            </tr>
            <tr>
              <br/>
              <br/>
              <br/>
            </tr>
            <tr>
              <table style={{width: '500px'}} id="Top">
              <tr>
                  {signerSignartures}
              </tr>
              <tr>
                  {signerNames}
              </tr>
              </table>
            </tr>
          </table>
          </div>
        </div>
      </div>
    );
  }
}

CertificatePreview.contextTypes = {
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

export default drizzleConnect(CertificatePreview, mapStateToProps)