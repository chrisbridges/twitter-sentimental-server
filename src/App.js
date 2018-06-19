import React, { Component } from 'react';
import {connect} from 'react-redux';
import TypedStocks from './components/TypedStocks';
import StockSearch from './components/StockSearch';
import FAQs from './components/Faqs';
import Loader from './components/Loader';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {

  renderAnalysis () {
    if (this.props.loading === null) {
      return null;
    }
    if (this.props.loading === true) {
      return <Loader />;
    }
    return <Dashboard />;
  }

  render() {
    return (
      <div className="App">
        <header role="banner">
          <h1>Pulse</h1>
          <h2>Performing Real-time Sentimental Analysis on Stocks</h2>
          <TypedStocks />
        </header>
        <StockSearch />
        <FAQs />
        <main aria-live="assertive" role="main">
          {this.renderAnalysis()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(App);