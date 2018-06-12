import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
var web3 = require('web3');
import { Input, Layout } from 'antd';
const { TextArea } = Input;
import { Radio } from 'antd';


// import Form from './=../../node_modules/muicss/lib/react/form';
// import Input from './../../node_modules/muicss/lib/react/input';
// import Textarea from './../../node_modules/muicss/lib/react/textarea';
// import Button from './../../node_modules/muicss/lib/react/button';




/*
 * Create component.
 */

class MyForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

    // Iterate over abi for correct function.
    // for (var i = 0; i < abi.length; i++) {
    //     if (abi[i].name === this.props.method) {
    //         this.inputs = abi[i].inputs;

    //         for (var i = 0; i < this.inputs.length; i++) {
    //             initialState[this.inputs[i].name] = '';
    //         }

    //         break;
    //     }
    // }

    // initialState['address'] = '';
    // initialState['recipientName'] = '';
    // initialState['title'] = '';
    // initialState['body'] = '';
    // initialState['bckgrdImg'] = '';
    // initialState['bdgImg'] = '';
    // initialState['expTime'] = '';
    // initialState['jsonUrl'] = '';



    // this.state = initialState;



    this.state = {
        mode: 'default',
        isToggleOn: false,
        radioChecked: false,
        currentYear: (new Date()).getFullYear(),
        startDate: moment(),
        'address': '',
        'recipientName': '',
        'title': '',
        'body': '',
        'bckgrdImg': '',
        'bdgImg': '',
        'expTime': '',
        'jsonUrl': '',
        // for add signer
        name: '',
        // signers: [{ name: '', address: ''}],
        signers: []
        
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignerNameChange = (idx) => (evt) => {
    const newSigners = this.state.signers.map((signer, sidx) => {
      if (idx !== sidx) return signer;
      return { ...signer, name: evt.target.value };
    });

    this.setState({ signers: newSigners });
  }

  handleSignerAddressChange = (idx) => (evt) => {
    const newSigners = this.state.signers.map((signer, sidx) => {
      if (idx !== sidx) return signer;
      return { ...signer, address: evt.target.value };
    });

    this.setState({ signers: newSigners });
  }

  handleSignerSubmit = (evt) => {
    const { name, signers } = this.state;
    alert(`Incorporated: ${name} with ${signers.length} signers`);
  }

  handleAddSigner = () => {
    console.log(this.state.signers)
    this.setState({
      signers: this.state.signers.concat([{ name: '', address: '' }])
    });
  }

  handleRemoveSigner = (idx) => () => {
    this.setState({
      signers: this.state.signers.filter((s, sidx) => idx !== sidx)
    });
  }

  handleSubmit() {
    console.log("revokable" + this.state.radioChecked)
    console.log("toggle" + this.state.isToggleOn)
    // this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state));
    this.concatenate();
    console.log("json is:"+JSON.stringify(this.state['jsonUrl']));
    //console.log([web3.utils.asciiToHex("Wang!")]);
    var signersAddresses = [];
    var signersNames = [];
    this.state.signers.forEach(function(a){
      signersAddresses.push(a.address);
      signersNames.push(a.name);
    });
    if (this.state.isToggleOn == 0) {
      this.state['startDate'] = 0;
    } else {
      this.state['startDate'] = this.state['startDate'].unix()*1000;
    }
    var signersNamesStr = signersNames.join(';');
    this.contracts[this.props.contract].methods[this.props.method].cacheSend(
      this.state['address'], 
      JSON.stringify(this.state['jsonUrl']),
      this.state['startDate'],
      signersAddresses,
      signersNamesStr, 
      this.state.radioChecked
    );
    this.cancelCourse();
    // this.contracts.PeonyCertificate.methods.IssueCertificate(
    //   this.state['address'], 
    //   JSON.stringify(this.state['jsonUrl']),
    //   this.state['startDate'].unix()*1000, 
    //   ['0x627306090abaB3A6e1400e9345bC60c78a8BEf57', '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'],
    //   [,[web3.utils.asciiToHex('Name1'),web3.utils.asciiToHex('Name2')]],
    // ).send({from: '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'}, function(error){
    //   console.log(error); 
    // });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
    console.log(date.unix())
  }

  toggleExpPanel = isToggleOn => {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }


  radioChecked = radioChecked => {
    this.setState(prevState => ({
      radioChecked: !prevState.radioChecked
    }));
    
  }


  concatenate() {
      this.state.jsonUrl = {
        "address": this.state['address'],
        "recipientName": this.state['recipientName'],
        "title": this.state['title'],
        "body": this.state['body'],
        "bckgrdImg": this.state['bckgrdImg'],
        "bdgImg": this.state['bdgImg']
      };
  }

  translateType(type) {
    switch(true) {
        case /^uint/.test(type):
            return 'number'
            break
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text'
            break
        case /^bool/.test(type):
            return 'checkbox'
            break
        default:
            return 'text'
    }
  }
  

  cancelCourse = () => { 
      this.myFormRef.reset();
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked" ref={(el) => this.myFormRef = el}>
      {/* <form className="pure-form pure-form-stacked"> */}
     {/* <form> */}
        <Layout style={{ padding: '24px 24px', width:'1300px'}}>
        <table>
            <tr>
                <td>Recipient Address: <Input type='text' name='address' placeholder='To Address' onChange={this.handleInputChange} /></td>
                <td>Recipient Name: <Input type='text' name='recipientName' placeholder='Recipient Name' onChange={this.handleInputChange} /></td>
            </tr>
            <tr>
                <td>Certificate Title: <Input type='text' name='title' placeholder='Certificate Title' onChange={this.handleInputChange} /></td>
            </tr>
            <tr>    
                <td>Certificate Content: <TextArea type='text' name='body' placeholder='Body' onChange={this.handleInputChange}/></td>    
            </tr>
            <tr>
                <td>background Image: <Input type='text' name='bckgrdImg' placeholder='Background Image Url' onChange={this.handleInputChange} /></td>
                <td>badge Image:<Input type='text' name='bdgImg' placeholder='Badge Image Url' onChange={this.handleInputChange} /></td>
            </tr>

        </table>
        <br/>
        <table>
            <tr>
                
                <td><Toggle
            defaultChecked={ false }
            label='Enable expiration date or not'
            onAriaLabel='This toggle is checked. Press to uncheck.'
            offAriaLabel='This toggle is unchecked. Press to check.'
            onText='On'
            offText='Off'
            onClick = {this.toggleExpPanel}
        />
        {
            this.state.isToggleOn ?
              <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.state.startDate}
              onChange={this.handleChange} />
            :
              <div/>
        }</td>
        <td><div>Is this certicate revokable or not?</div>
        <Radio onClick={this.radioChecked} checked={this.state.radioChecked}>Revokable</Radio></td>
            </tr>
        </table>
        <br/>
        <form onSubmit={this.handleSignerSubmit}>
            
            <div>Add Signer</div>

            {this.state.signers.map((signer, idx) => (
            <div className="signer">
                <table>
                    <tr>
                        <td><input type="text" placeholder={`Signer #${idx + 1} name`} value={signer.name} onChange={this.handleSignerNameChange(idx)}/></td>
                        <td><input type="text" placeholder={`Signer #${idx + 1} address`} value={signer.address} onChange={this.handleSignerAddressChange(idx)}/></td>
                        <td><button type="button" onClick={this.handleRemoveSigner(idx)} className="small">-</button></td>
                    </tr>
                </table>
            </div>
            ))}
            
            <button type="button" onClick={this.handleAddSigner} className="small">Add Signer</button>
            
            {/* <button>Incorporate</button> */}
        </form>
        


        <br/>

        {/* {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
            return (<input key={input.name} type={inputType} name={input.name} value={this.state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} />)
        })} */}
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
        </Layout>
      </form>
    )
  }
}

MyForm.contextTypes = {
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

export default drizzleConnect(MyForm, mapStateToProps)