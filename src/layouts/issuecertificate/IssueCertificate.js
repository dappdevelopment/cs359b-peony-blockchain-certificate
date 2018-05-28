import React, { Component } from 'react'
import Calendar from 'react-calendar';
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Layout, Menu, Alert } from 'antd';

import PropTypes from 'prop-types'
// import Toggle from '../../components/Toggle'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import MyForm from '../../components/MyForm'






const { Content, Sider } = Layout;

class IssueCertificate extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      mode: 'default',
      isToggleOn: false,
      currentYear: (new Date()).getFullYear(),
      startDate: moment(),
      
    };
    // this.handleChange = this.handleChange.bind(this);
  }
 



  // handleChange(date) {
  //   this.setState({
  //     startDate: date
  //   });
  //   console.log(date.unix())
  // }
  

  onSelectTab = ({key}) => {
    this.setState({
      mode: key
    });
  }
  

  // toggleExpPanel = isToggleOn => {
  //   this.setState(prevState => ({
  //     isToggleOn: !prevState.isToggleOn
  //   }));
  // }

  

  
  render() {
    return (
      <Layout style={{ padding: '24px 24px', background: '#fff'}}>
        {/* <div className="pure-u-1-1"> */}
        <div>
          <h2>Issue My Peony</h2>
          <p>Create and issue new certificate!</p>
          {/* <p><strong>List</strong>: <ContractForm contract="PeonyCertificate" method="IssueCertificate"  labels={['To Address', 'Customer Text']} /></p> */}
          <p><strong></strong><MyForm contract="PeonyCertificate" method="IssueCertificate"  labels={['To Address', 'Customer Text', 'Expiration Time in (uint timestamp)']} /></p>
          {/* <Toggle updateParentst={this.toggleExpPanel} value={this.state.isToggleOn}/> */}
            {/* <Toggle
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
          } */}
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