import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import { Card, Col, Row, Layout, Alert, message, Button } from 'antd';
import PropTypes from 'prop-types'
// import logo from '../../peonyLogo.png'
// if we ever change to a non-white background
import logo from '../../peony_logo_white_background.png'
import EditableCell from '../../components/EditableCell'

import './css/style.css';
// import styles from 'css/style.css';
// import "css/style.css"

class Lookup extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount() {
    this.checkEmployee();
  }

  checkEmployee = () => {
  }

  getPaid = () => {
  }

  renderContent() {
    return (
      <div>
        <h2>To do!!!!!</h2>
      </div>
    );
  }

  render() {
    return (

/*
      <Layout style={{ padding: '24px 24px', background: '#fff' }}>
        {<Common account={account} payroll={payroll} web3={web3} />
        <h2>personal msg</h2>}
        <div className="pure-u-1-1">
          <h2>To do!!!!!</h2>
        </div>
        
      </Layout >
 */
    // <link href="css/style.css" rel="stylesheet"/>
    <div className="pure-u-1-1 header">
      <img src={logo} alt="peony-logo" width="200px"/>
      <h1>Peony</h1>
      <div>
        <p>Total Active Certificate Powered By Peony: <ContractData contract="PeonyCertificate" method="totalSupply"/></p>
      </div>
      <br/><br/>
      <EditableCell />


      <div class="container">
        <div class="row">

          <div class="col-lg-4 box">
            <i class="ion-ios-bookmarks-outline"></i>
            <h4 class="title"><a href="">You own your data</a></h4>
            <p class="description">Hidden from the Hoolis™ of the world</p>
          </div>

          <div class="col-lg-4 box box-bg">
            <i class="ion-ios-stopwatch-outline"></i>
            <h4 class="title"><a href="">You control your identity</a></h4>
            <p class="description">Decide what private is made public</p>
          </div>

          <div class="col-lg-4 box">
            <i class="ion-ios-heart-outline"></i>
            <h4 class="title"><a href="">You have the power</a></h4>
            <p class="description">With decentralized apps and storage to make the internet the fastest it can be</p>
          </div>

        </div>
      </div>    
          

      <div class="container">
  
      <header class="section-header">
        <h3>About Us</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </header>
  
        <div class="row about-cols">
          <div class="col-md-4 wow fadeInUp">
            <div class="about-col">
              <div class="img">
                <img src="img/about-mission.jpg" alt="" class="img-fluid"/>
                <div class="icon"><i class="ion-ios-speedometer-outline"></i></div>
              </div>
              <h2 class="title"><a href="#">Our Mission</a></h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
      
          <div class="col-md-4 wow fadeInUp" data-wow-delay="0.1s">
            <div class="about-col">
              <div class="img">
                <img src="img/about-plan.jpg" alt="" class="img-fluid"/>
                <div class="icon"><i class="ion-ios-list-outline"></i></div>
              </div>
              <h2 class="title"><a href="#">Our Plan</a></h2>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem  doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
      
          <div class="col-md-4 wow fadeInUp" data-wow-delay="0.2s">
            <div class="about-col">
              <div class="img">
                <img src="img/about-vision.jpg" alt="" class="img-fluid"/>
                <div class="icon"><i class="ion-ios-eye-outline"></i></div>
              </div>
              <h2 class="title"><a href="#">Our Vision</a></h2>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aut odit aut fugit, sed quia magni dolores eos qui ratione voluptatem sequi nesciunt Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
            </div>
          </div>
    
        </div>
  
      </div>
            
    </div>
  

    );
  }
}

Lookup.contextTypes = {
  drizzle: PropTypes.object
}

export default Lookup