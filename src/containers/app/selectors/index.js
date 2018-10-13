import { createSelector } from 'reselect';
import reducer from '../reducer';

const makeSelectInput = initialState =>
  createSelector(reducer, state => state.get('userInput'));

const makeSelectLoadUserInputPending = initialState =>
  createSelector(reducer, state => state.get('loadUserInputPending'));

const makeSelectLoadUserInputSuccess = initalState =>
  createSelector(reducer, state => state.get('loadUserInputSuccess'));

const makeSelectLoadUserInputError = initialState =>
  createSelector(reducer, state => state.get('loadUserInputError'));

export {
  makeSelectInput,
  makeSelectLoadUserInputPending,
  makeSelectLoadUserInputSuccess,
  makeSelectLoadUserInputError
};
