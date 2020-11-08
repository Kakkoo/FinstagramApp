import { SET_ERROR } from '../actions/types';

const initialState = {};

const error = function (state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
export default error;
