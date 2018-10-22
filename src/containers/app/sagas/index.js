import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import 'whatwg-fetch';
import { makeSelectInput, makeSelectQueryType } from '../selectors';
import { loadUserInputSuccess, loadUserInputError } from '../actions';
import { LOAD_USER_INPUT_PENDING } from '../constants';

function request(url, options) {
  return fetch(url, options).then(res => res.json());
}

export function* sendUserInput() {
  let query;
  let url;
  const input = yield select(makeSelectInput());
  const formatted = JSON.stringify(input);
  const type = yield select(makeSelectQueryType());

  if (type === '@') {
    try {
      url = 'https://sheltered-lake-88243.herokuapp.com/timeline';
      query = yield call(request, url, {
        method: 'POST',
        body: formatted
      });
      yield put(loadUserInputSuccess(query));
    } catch (err) {
      yield put(loadUserInputError(err));
    }
  } else if (type === '#') {
    try {
      url = 'https://sheltered-lake-88243.herokuapp.com/search';
      query = yield call(request, url, {
        method: 'POST',
        body: formatted
      });
      yield put(loadUserInputSuccess(query));
    } catch (err) {
      yield put(loadUserInputError);
    }
  }
}

export default function* rootSaga() {
  yield all([takeLatest(LOAD_USER_INPUT_PENDING, sendUserInput)]);
}

/*
NOTE: fortified request handler, simplified version used in request function

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

*/
