import { ActionTypes } from "../constants/action-types";
const intialState = {
  areas: []
};

export const areasReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_AREAS:
      return { ...state, areas: payload };
    default:
      return state;
  }
};