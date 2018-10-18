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

    return (
      <div>
        <h2>Twitter Handle + ENTER for Sentiment Analysis</h2>
        <form onSubmit={onUserSubmit}>
          <input type="text" value={input} onChange={onUserInput} />
          {console.log(this.props)}
          <h2>@{input}</h2>
          {score ? <h2>Sentiment Score: {score}</h2> : ''}
        </form>
        {inputSuccess.length ? <List list={inputSuccess} /> : ''}
        {console.log(sent)}
        {console.log(`score`, score)}
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
