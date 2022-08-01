import { ActionTypes } from "../constants/action-types";

export const setAreas = (data) => {
  return {
    type: ActionTypes.SET_AREAS,
    payload: data,
  };
};