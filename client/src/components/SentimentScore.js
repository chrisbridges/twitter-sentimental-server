import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SentimentScore.css';

export class SentimentScore extends Component {

  renderEmojis (score) {
    if (score < -150) {
      return <span role="img" aria-label="3 broken hearts">💔💔💔</span>;
    }
    if (score < -100) {
      return <span role="img" aria-label="2 broken hearts">💔💔</span>;
    }
    if (score < -50) {
      return <span role="img" aria-label="1 broken heart">💔</span>;
    }
    if (score < -20) {
      return <span role="img" aria-label="really sad face">🙁</span>;
    }
    if (score < -10) {
      return <span role="img" aria-label="sad face">😔</span>;
    }
    if (score < 0) {
      return <span role="img" aria-label="unsure face">😕</span>;
    }


    if (score > 150) {
      return <span role="img" aria-label="3 hearts">💖💖💖</span>;
    }
    if (score > 100) {
      return <span role="img" aria-label="2 hearts">💖💖</span>;
    }
    if (score > 50) {
      return <span role="img" aria-label="1 heart">💖</span>;
    }
    if (score > 20) {
      return <span role="img" aria-label="big happy face">😀</span>;
    }
    if (score > 10) {
      return <span role="img" aria-label="smiley face">😊</span>;
    }
    if (score > 0) {
      return <span role="img" aria-label="happy face">🙂</span>;
    }
    return <span role="img" aria-label="thinking face">🤔</span>;
  }

  render() {
    const score = this.props.sentimentScore;
    return (
      <div aria-live="polite" className="sentiment-score col">
        <h1>Sentiment Score:</h1>
        <p className="score">{score}</p>
        <p className="emoji">{this.renderEmojis(score)}</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  sentimentScore: state.sentimentScore
});

export default connect(mapStateToProps)(SentimentScore);