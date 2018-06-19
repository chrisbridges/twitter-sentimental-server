import React, { Component } from 'react';
import Typed from 'typed.js';
import './TypedStocks.css';

export class TypedStocks extends Component {

  componentDidMount () {
    const stocks = ['AAPL ^500 (Apple)', 'NFLX ^500 (Netflix)', 'TWTR ^500 (Twitter)', 'TSLA ^500 (Tesla)', 'FB ^500 (Facebook)', 'SNAP ^500 (Snapchat)', 'SPOT ^500 (Spotify)', 'Anything you\'d like :)'];
    const options = {
      stringsElement: '.typed',
      strings: stocks,
      typeSpeed: 100,
      loop: true
    };
    const typed = new Typed('#typed', options);
    return typed;
  }

  render() {
    return (
      <div aria-hidden="true" className="typed-stocks">
        <h1>Find out what people are saying about:<br/><div className="typed-background"><span id="typed"></span></div></h1>
      </div>
    );
  }
}

export default TypedStocks;