import React, { Component } from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import chartStreaming from 'chartjs-plugin-streaming';
import './MyChart.css';

export class MyChart extends Component {

  componentDidMount () {
    var ctx = document.getElementById("myChart").getContext('2d');
    var streamingChart = new Chart(ctx, {
      type: 'line',         
      data: {
        datasets: [{
          label: 'Sentiment Score',
          backgroundColor: '#45B25C',
          borderColor: '#45B25C',
          data: []            
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'realtime'    // x axis will auto-scroll from right to left
          }]
      },
      plugins: {
        streaming: {          
          duration: 20000,    // data in the past 20000 ms will be displayed
          refresh: 1000,      // onRefresh callback will be called every 1000 ms
          delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
          frameRate: 30,      // chart is drawn 30 times every second

          // a callback to update datasets
          onRefresh: (chart) => {
            chart.data.datasets[0].data.push({
              x: Date.now(),
              y: this.props.sentimentScore
            });
          }
        }
      }
    }
  }
    );
    console.log(chartStreaming, streamingChart);
  }

  retrieveScore () {
    return this.props.sentimentScore;
  }

  render() {
    return (
      <div aria-hidden="true" className="chart">
        <canvas id="myChart"></canvas>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sentimentScore: state.sentimentScore
});

MyChart.propTypes = {
  sentimentScore: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(MyChart);