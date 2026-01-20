import {
  GET_BOOKING_REQUEST,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_FAIL
} from "./ActionType";

const initialState = {
  loading: false,
  booking: null,
  error: null
};

export const bookingReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_BOOKING_SUCCESS:
      return {
        loading: false,
        booking: action.payload,
        error: null
      };

    case GET_BOOKING_FAIL:
      return {
        loading: false,
        booking: null,
        error: action.payload
      };

    default:
      return state;
  }
};
