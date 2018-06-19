import React, { Component } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import './Faqs.css';

export class Faqs extends Component {

  renderFAQs () {
    const faqs = [
      {
        question: 'What is sentimental analysis?',
        answer: 'Sentimental Analysis is the computational analysis of text to determine whether the writer is expressing positive or negative emotions about the subject. Our attempt with this app is to gauge sentiment in real-time and make assumptions about whether the general public feels bullish or bearish on a particular equity based on current sentiment.'
      },
      {
        question: 'How are you conducting this analysis?',
        answer: 'This analysis is done by live-streaming tweets about a particular subject and then running those tweets through our sentimental analysis engine, which then determines the "Sentiment Score". This provides an easy way to determine current sentiment. A positive Sentiment Score means current sentiment is amicable about the subject, and the opposite, accordingly, for a negative score.'
      },
      {
        question: 'How is the Sentiment Score calculated?',
        answer: 'Each word has a score attached to it. Generally positive words carry a positive score, while words perceived as negative possess a negative value. The scores are then summed, and we arrive at our Sentiment Score. The most common words that are being tweeted (and affecting the Sentiment Score) are displayed in the dashboard.'
      },
      {
        question: 'Should I derive investment decisions from the data that I see here?',
        answer: 'Only if you like losing money. But seriously, please don\'t :).'
      },
      {
        question: 'It\'s taking a long time for tweets to load.',
        answer: 'Due to the real-time nature of this app, if Twitter users aren\'t tweeting about the subject you\'re interested in, it can take some time. If you would like to see the app really move, type in a cryptocurrency (e.g. "BTC" for Bitcoin, or "ETH" for Ethereum)'
      }
    ];

    return faqs.map((item, key) => {
      return <AccordionItem key={key}>
        <AccordionItemTitle>
          {item.question}
        </AccordionItemTitle>
        <AccordionItemBody>
          {item.answer}
        </AccordionItemBody>
      </AccordionItem>
    });
  }

  render () {
    const FAQs = this.renderFAQs();
    return (
      <div className="FAQs">
        <Accordion>
          {FAQs}
        </Accordion>
      </div>
    );
  }
}

export default Faqs;