import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
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
        
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    // this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(this.state));
    this.concatenate();
    console.log("json is:"+JSON.stringify(this.state['jsonUrl']));
    this.contracts[this.props.contract].methods[this.props.method].cacheSend(this.state['address'], JSON.stringify(this.state['jsonUrl']),this.state['startDate'].unix());
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

  render() {
    return (
      <form className="pure-form pure-form-stacked">
        <input type='text' name='address' placeholder='To Address' onChange={this.handleInputChange} />
        <input type='text' name='recipientName' placeholder='Recipient Name' onChange={this.handleInputChange} />
        <input type='text' name='title' placeholder='Certificate Title' onChange={this.handleInputChange} />
        <input type='text' name='body' placeholder='Body' onChange={this.handleInputChange} />
        <input type='text' name='bckgrdImg' placeholder='Background Image Url' onChange={this.handleInputChange} />
        <input type='text' name='bdgImg' placeholder='Badge Image Url' onChange={this.handleInputChange} />
        <Toggle
            defaultChecked={ true }
            label='Enabled and checked'
            onAriaLabel='This toggle is checked. Press to uncheck.'
            offAriaLabel='This toggle is unchecked. Press to check.'
            onText='On'
            offText='Off'
            onClick = {this.toggleExpPanel}
        />
        {
            ! this.state.isToggleOn ?
              <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.state.startDate}
              onChange={this.handleChange} />
            :
              <div/>
          }
        {/* {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
            return (<input key={input.name} type={inputType} name={input.name} value={this.state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} />)
        })} */}
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
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