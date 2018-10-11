import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { userInput, loadUserInputPending } from '../actions';
import { makeSelectInput } from '../selectors';

class App extends Component {
  render() {
    return (
      <div>
        User Input: <span />
        <form onSubmit={this.props.onUserSubmit}>
          <input
            type="text"
            value={this.props.input}
            onChange={this.props.onUserInput}
          />
          {console.log(this.props)}
          <h1>{this.props.input}</h1>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  input: makeSelectInput()
});

const mapDispatchToProps = dispatch => {
  return {
    onUserInput: evt => dispatch(userInput(evt.target.value)),
    onUserSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUserInputPending(evt.target.value));
      console.log(`wowza`);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
