import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import 'whatwg-fetch';
import { makeSelectInput } from '../selectors';
import { loadUserInputSuccess, loadUserInputError } from '../actions';
import { LOAD_USER_INPUT_PENDING } from '../constants';

function request(url, options) {
  return fetch(url, options)
    .then(response => response.text())
    .then(res => JSON.stringify(res))
    .catch(err => console.log(err));
}

export function* sendUserInput() {
  let input = yield select(makeSelectInput());
  const url = 'http://localhost:1438';
  console.log(`LSL`, input);

  try {
    const formatted = JSON.stringify(input);
    const query = yield call(request, url, {
      method: 'POST',
      body: formatted,
      mode: 'no-cors'
    });
    yield put(loadUserInputSuccess(query));
  } catch (err) {
    yield put(loadUserInputError(err));
  }
}

export default function* rootSaga() {
  yield all([takeLatest(LOAD_USER_INPUT_PENDING, sendUserInput)]);
}
