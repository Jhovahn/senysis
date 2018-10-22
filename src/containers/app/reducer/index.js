import {
  USER_INPUT,
  LOAD_USER_INPUT_PENDING,
  LOAD_USER_INPUT_SUCCESS,
  LOAD_USER_INPUT_ERROR,
  QUERY_TYPE
} from '../constants';

import { fromJS } from 'immutable';

export const initialState = fromJS({
  userInput: '',
  loadUserInputPending: false,
  loadUserInputSuccess: false,
  loadUserInputError: false,
  queryType: '@'
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_INPUT:
      return state.set('userInput', action.input);
    case LOAD_USER_INPUT_PENDING:
      return state.set('loadUserInputPending', true);
    case LOAD_USER_INPUT_SUCCESS:
      return state
        .set('loadUserInputPending', false)
        .set('loadUserInputSuccess', action.response);
    case LOAD_USER_INPUT_ERROR:
      return state
        .set('loadUserInputPending', false)
        .set('loadUserInputError', action.response);
    case QUERY_TYPE:
      console.log(action);
      return state.set('queryType', action.input);
    default:
      return state;
  }
}
