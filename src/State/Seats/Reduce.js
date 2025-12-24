import {
  BUS_SEAT_FETCH_REQUEST,
  BUS_SEAT_FETCH_SUCCESS,
  BUS_SEAT_FETCH_FAIL,
  BUS_SEAT_SELECTION_SUCCESS,
  BUS_SEAT_SELECTION_FAIL,
  TOGGLE_SEAT
} from "./ActionType";

const initialState = {
  loading: false,
  seats: [],
  selectedSeats: [],
  error: null
};

export const seatReducer = (state = initialState, action) => {
  switch (action.type) {

    // -------- FETCH SEATS --------
    case BUS_SEAT_FETCH_REQUEST:
      return { ...state, loading: true };

    case BUS_SEAT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        seats: action.payload,
        error: null
      };

    case BUS_SEAT_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // -------- TOGGLE SEAT (UI ONLY) --------
    case TOGGLE_SEAT: {
      const exists = state.selectedSeats.find(
        s => s.seatNumber === action.payload.seatNumber
      );

      return {
        ...state,
        selectedSeats: exists
          ? state.selectedSeats.filter(
              s => s.seatNumber !== action.payload.seatNumber
            )
          : [...state.selectedSeats, action.payload]
      };
    }

    // -------- CONFIRM / BOOK SEATS --------
    case BUS_SEAT_SELECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        seats: state.seats.map(seat =>
          action.payload.find(s => s.seatNumber === seat.seatNumber)
            ? { ...seat, available: false }
            : seat
        ),
        selectedSeats: [],
        error: null
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
