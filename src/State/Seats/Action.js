export const BUS_SEAT_SELECTION_REQUEST = "BUS_SEAT_SELECTION_REQUEST";
export const BUS_SEAT_SELECTION_SUCCESS = "BUS_SEAT_SELECTION_SUCCESS";
export const BUS_SEAT_SELECTION_FAIL = "BUS_SEAT_SELECTION_FAIL";
import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";


export const selectSeats = (busNumber, selectedSeats) => async (dispatch) => {
  dispatch({ type: BUS_SEAT_SELECTION_REQUEST });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/seats/select`,
      {
        busNumber: busNumber,
        seatNumbers: selectedSeats
      }
    );

    dispatch({
      type: BUS_SEAT_SELECTION_SUCCESS,
      payload: response.data
    });

    console.log("Seats booked successfully:", response.data);
  } catch (error) {
    dispatch({
      type: BUS_SEAT_SELECTION_FAIL,
      payload: error.response?.data || error.message
    });
  }
};

export const getSeatsByBus = (busNumber) => async (dispatch) => {
  dispatch({ type: BUS_SEAT_FETCH_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/seats/bus/${busNumber}`
    );
  console.log("Fetched seats:", data);
    dispatch({
      type: BUS_SEAT_FETCH_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: BUS_SEAT_FETCH_FAIL,
      payload: err.response?.data || err.message
    });
  }
};

