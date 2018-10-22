import {
  USER_INPUT,
  LOAD_USER_INPUT_PENDING,
  LOAD_USER_INPUT_SUCCESS,
  LOAD_USER_INPUT_ERROR,
  QUERY_TYPE
} from '../constants';

export const queryType = input => {
  return {
    type: QUERY_TYPE,
    input
  };
};
export const userInput = input => {
  return {
    type: USER_INPUT,
    input
  };
};

export const loadUserInputPending = input => {
  return {
    type: LOAD_USER_INPUT_PENDING,
    input
  };
};

export const loadUserInputSuccess = response => {
  return {
    type: LOAD_USER_INPUT_SUCCESS,
    response
  };
};

export const loadUserInputError = response => {
  return {
    type: LOAD_USER_INPUT_ERROR,
    response
  };
};
