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

class App extends Component {
  render() {
    const { inputSuccess, onUserSubmit, onUserInput, input } = this.props;
    return (
      <div>
        User Input: <span />
        <form onSubmit={onUserSubmit}>
          <input type="text" value={input} onChange={onUserInput} />
          {console.log(this.props)}
          <h1>@{input}</h1>
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
