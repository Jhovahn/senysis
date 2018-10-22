import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userInput, loadUserInputPending, queryType } from '../actions';
import {
  makeSelectInput,
  makeSelectLoadUserInputPending,
  makeSelectLoadUserInputSuccess,
  makeSelectLoadUserInputError,
  makeSelectQueryType
} from '../selectors';
import { List } from '../../../components/List';

const Sentiment = require('sentiment');
const sentiment = new Sentiment();

class App extends Component {
  wordScore(score) {
    if (score === 0) return 'NEUTRAL';
    if (score > 0 && score < 1) return 'SLIGHTLY POSITIVE';
    if (score >= 1 && score < 3) return 'POSITIVE';
    if (score > 3 && score < 4) return 'VERY POSITIVE';
    if (score > 4) return 'EXTREMELY POSITIVE';
    if (score < 0 && score > -1) return 'SLIGHTLY NEGATIVE';
    if (score <= -1 && score > -3) return 'NEGATIVE';
    if (score <= -3) return 'EXTREMELY NEGATIVE';
  }

  changeTypeResponse = evt => {
    this.props.onChangeQueryType(evt);
    this.props.onUserSubmit(evt);
  };

  render() {
    const {
      input,
      inputSuccess,
      inputPending,
      inputError,
      onUserSubmit,
      onUserInput,
      queryType
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
    const styleInput = {
      borderRadius: '5px',
      height: '50px',
      width: '40%',
      padding: '10px',
      fontSize: '30px'
    };

    const logoStyle = {
      color: 'blue'
    };

    return (
      <div className="text-center">
        <h2>
          Tweet <b style={logoStyle}>Sen</b>
          timent Anal
          <b style={logoStyle}>ysis</b>{' '}
        </h2>
        <div>
          <ul style={{ listStyleType: 'none' }}>
            <li>Type in a Twitter user-handle or topic</li>
            <li>
              <strong>@</strong> for sentiment of user timeline
            </li>
            <li>
              <strong>#</strong> for sentiment of topic-related tweets
            </li>
            <li>
              Average sentiment score and rating will be generated and displayed
            </li>
            <li>Tweets used in analysis will also be listed</li>
          </ul>
        </div>
        <form onSubmit={onUserSubmit}>
          <input
            type="text"
            value={input}
            onChange={onUserInput}
            placeholder="michelleobama"
            style={styleInput}
          />
        </form>
        <span />
        <div style={{ paddingTop: '10px' }}>
          <button
            className="btn btn-outline-primary"
            value="@"
            onClick={this.changeTypeResponse}
          >
            @
          </button>
          {'   '}
          <button
            className="btn btn-outline-primary"
            value="#"
            onClick={this.changeTypeResponse}
          >
            #
          </button>
        </div>

        <h2>
          {queryType}
          {input}
        </h2>
        {inputPending ? (
          <div>
            <p>loading...</p>
          </div>
        ) : score ? (
          <div>
            <h3>Average Sentiment Score: {score}</h3>
            <h3>Rating: {word}</h3>
            {inputSuccess.length ? <List list={inputSuccess} /> : ''}
          </div>
        ) : (
          ''
        )}
        <a
          href="https://linkedin.com/in/jhovahn"
          style={{ textDecoration: 'none', paddingTop: '10px' }}
        >
          <p style={{ paddingTop: '10px' }}>Contact Me</p>
        </a>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  input: makeSelectInput(),
  inputPending: makeSelectLoadUserInputPending(),
  inputSuccess: makeSelectLoadUserInputSuccess(),
  inputError: makeSelectLoadUserInputError(),
  queryType: makeSelectQueryType()
});

const mapDispatchToProps = dispatch => {
  return {
    onUserInput: evt => dispatch(userInput(evt.target.value)),
    onUserSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUserInputPending(evt.target.value));
    },
    onChangeQueryType: evt => dispatch(queryType(evt.target.value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
