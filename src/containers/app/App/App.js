import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userInput, loadUserInputPending } from '../actions';
import {
  makeSelectInput,
  makeSelectLoadUserInputPending,
  makeSelectLoadUserInputSuccess,
  makeSelectLoadUserInputError
} from '../selectors';
import { List } from '../../../components/List';

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

class App extends Component {
  wordScore(score) {
    if (score === 0) return 'NEUTRAL';
    if (score > 0 && score < 1) return 'SLIGHTLY POSITIVE';
    if (score >= 1 && score < 3) return 'POSITIVE';
    if (score >= 3) return 'EXTREMELY POSITIVE';
    if (score < 0 && score > -1) return 'SLIGHTLY NEGATIVE';
    if (score < -1 && score > -3) return 'NEGATIVE';
    if (score <= -3) return 'EXTREMELY NEGATIVE';
  }
  render() {
    const {
      inputSuccess,
      inputPending,
      inputError,
      onUserSubmit,
      onUserInput,
      input
    } = this.props;
    const sent = inputPending
      ? 'loading...'
      : Array.isArray(inputSuccess)
        ? inputSuccess.map(el => {
            let analysis = sentiment.analyze(el.full_text);
            return { tweet: el.full_text, analysis: analysis };
          })
        : inputError
          ? 'no such name'
          : false;
    const score =
      Array.isArray(sent) && sent.length > 0
        ? sent.map(el => el.analysis.score).reduce((a, b) => a + b) /
          sent.length
        : false;
    const word = this.wordScore(score);

    return (
      <div className="text-center">
        <h1 />
        <h2>Sentiment Analysis of latest Tweets by Twitter Handle</h2>
        <form onSubmit={onUserSubmit}>
          <input type="text" value={input} onChange={onUserInput} />
          <h2>@{input}</h2>
          {score ? (
            <div>
              <h3>Average Sentiment Score: {score}</h3>
              <h3>Rating: {word}</h3>
            </div>
          ) : (
            ''
          )}
        </form>
        {inputSuccess.length ? <List list={inputSuccess} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  input: makeSelectInput(),
  inputPending: makeSelectLoadUserInputPending(),
  inputSuccess: makeSelectLoadUserInputSuccess(),
  inputError: makeSelectLoadUserInputError()
});

const mapDispatchToProps = dispatch => {
  return {
    onUserInput: evt => dispatch(userInput(evt.target.value)),
    onUserSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUserInputPending(evt.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
