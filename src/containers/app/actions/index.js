import USER_INPUT from '../constants';

export const userInput = input => {
  return {
    type: USER_INPUT,
    input
  };
};
