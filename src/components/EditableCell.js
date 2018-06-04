import React, { Component } from 'react'
import { Input, Icon } from 'antd';
const Search = Input.Search;
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import _ from 'underscore'

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
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
    console.log("!")
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
            
            <Search
              placeholder="input search text"
              onSearch={value => {console.log(value); this.check(); this.setState({value});}}
              
              enterButton
            />


              {/* <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
                
              /> */}
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            {
              !_.isEmpty(value) ?
                <div>
                <ContractData contract="PeonyCertificate" method="tokenURI" methodArgs={[value]}/>
                <p></p>
                <p>Issued By:  </p>
                <ContractData contract="PeonyCertificate" method="GetIssuerAddressByTokenId" methodArgs={[value]}/>
                </div>
              :
                <div/>
            }
            </div>
        }
      </div>
    );
  }
}

export default EditableCell