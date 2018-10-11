import USER_INPUT from '../constants';

const initialState = { userInput: '' };

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_INPUT:
      return Object.assign({}, state, { userInput: action.input });
    default:
      return state;
  }
}
