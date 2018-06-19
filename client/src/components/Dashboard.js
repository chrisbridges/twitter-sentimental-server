import React, { Component } from 'react';
import Tweets from './Tweets';
import SentimentWords from './SentimentWords';
import SentimentScore from './SentimentScore';
import MyChart from './MyChart';

export class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <div className="analysis">
          <Tweets />
          <SentimentWords />
          <SentimentScore />
        </div>
        <MyChart />
      </div>
    );
  }
}

export default Dashboard;