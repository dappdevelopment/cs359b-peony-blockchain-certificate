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



/*
 * Create component.
 */

class SignForm extends Component {
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
        currentYear: (new Date()).getFullYear(),
        startDate: moment(),
        'signature': '',
        accountsAddr: this.props.accountsAddr,
        tokenId: this.props.tokenId
        
    };
    this.handleChange = this.handleChange.bind(this);
  }

  
  
  

  handleSubmit() {
    this.state['startDate'] = this.state['startDate'].unix()*1000;

    this.contracts[this.props.contract].methods[this.props.method].cacheSend(
      this.props.tokenId, 
      this.state['signature'],
      this.state['startDate']
    );
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

  render() {
    return (
      
      <form className="pure-u-1-1 header">
    {/* <form> */}
        <table>
            <tr>
                <td>signature: <input type='text' name='signature' placeholder='Type your signature here' onChange={this.handleInputChange} /></td>
                
            </tr>
            <tr>
                <td><DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.state.startDate}
              onChange={this.handleChange} /></td>
            </tr>
        </table>
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

SignForm.contextTypes = {
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

export default drizzleConnect(SignForm, mapStateToProps)