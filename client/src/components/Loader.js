import React, { Component } from 'react';
import {connect} from 'react-redux';
import {BounceLoader} from 'react-spinners';

export class Loader extends Component {
  render() {
    return (
      <div aria-live="assertive" className="loading">
        <div className="loading-spinner">
          <BounceLoader color={'#45B25C'} loading={this.props.loading} />
        </div>
        <p>{"\n"}Waiting for someone to tweet something about {this.props.stock}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  stock: state.stock
});

export default connect(mapStateToProps)(Loader);
