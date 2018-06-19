import React, { Component } from 'react';
import {connect} from 'react-redux';
import './SentimentWords.css';

export class SentimentWords extends Component {

  findMostFrequentWords (wordsObj) {
    let words = Object.keys(wordsObj);
    const mostFrequentWords = words.sort((word1, word2) => {
      return wordsObj[word2] - wordsObj[word1];
    });
    // return the 5 most frequently tweeted words
    return mostFrequentWords.splice(0,5);
  }
// add 'loading' prop logic to not display these messages if loading === true
  renderWords (words, positiveOrNegative) {
    if (this.props.tweets.length >= 1 && words.length === 0 && positiveOrNegative === 'positive') {
      return <p>When someone tweets something positive about {this.props.stock} it will show up here</p>;
    }
    if (this.props.tweets.length >= 1 && words.length === 0 && positiveOrNegative === 'negative') {
      return <p>When someone tweets something negative about {this.props.stock} it will show up here</p>;
    }
    return words.map((word, index) => {
      return <li key={index}>{word}</li>
    });
  }

  render() {
    return (
      <div aria-live="polite" className="sentiment-words col">
        <div className="positive-words">
          <h1>Positive:</h1>
          <ul>
            {this.renderWords(this.findMostFrequentWords(this.props.positiveWords), 'positive')}
          </ul>
        </div>
        <div className="negative-words">
          <h1>Negative:</h1>
          <ul>
            {this.renderWords(this.findMostFrequentWords(this.props.negativeWords), 'negative')}
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  tweets: state.tweets,
  positiveWords: state.positiveWords,
  negativeWords: state.negativeWords
});

export default connect(mapStateToProps)(SentimentWords);
