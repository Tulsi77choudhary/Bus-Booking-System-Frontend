import {
  BUS_SEAT_SELECTION_REQUEST,
  BUS_SEAT_SELECTION_SUCCESS,
  BUS_SEAT_SELECTION_FAIL
} from "./ActionType";

const initialState = {
  loading: false,
  seats: [],
  error: null
};

export const seatReducer = (state = initialState, action) => {
  switch (action.type) {

    case BUS_SEAT_SELECTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case BUS_SEAT_SELECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        seats: action.payload
      };

    case BUS_SEAT_SELECTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
