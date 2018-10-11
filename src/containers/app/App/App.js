import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userInput } from '../actions';

class App extends Component {
  render() {
    return (
      <div>
        User Input: <span />
        <form>
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

const mapStateToProps = state => {
  return {
    input: state.userInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUserInput: evt => dispatch(userInput(evt.target.value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
