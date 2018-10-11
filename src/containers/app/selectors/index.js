import { createSelector } from 'reselect';
import reducer from '../reducer';

const makeSelectInput = initialState =>
  createSelector(reducer, homestate => homestate.get('userInput'));

export { makeSelectInput };
