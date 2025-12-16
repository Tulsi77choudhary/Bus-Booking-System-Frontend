import {
  BUS_SEARCH_REQUEST,
  BUS_SEARCH_SUCCESS,
  BUS_SEARCH_FAIL,
} from "./ActionType";

const initialState = {
  loading: false,
  buses: [],
  error: null,
};

export const busReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUS_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case BUS_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        buses: action.payload,
      };

    case BUS_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        buses: [],
      };

    default:
      return state;
  }
};
