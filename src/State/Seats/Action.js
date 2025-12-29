export const BUS_SEAT_SELECTION_REQUEST = "BUS_SEAT_SELECTION_REQUEST";
export const BUS_SEAT_SELECTION_SUCCESS = "BUS_SEAT_SELECTION_SUCCESS";
export const BUS_SEAT_SELECTION_FAIL = "BUS_SEAT_SELECTION_FAIL";
export const BUS_SEAT_FETCH_REQUEST = "BUS_SEAT_FETCH_REQUEST";
export const BUS_SEAT_FETCH_SUCCESS = "BUS_SEAT_FETCH_SUCCESS";
export const BUS_SEAT_FETCH_FAIL = "BUS_SEAT_FETCH_FAIL";

import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";


export const selectSeats = (busNumber, Seats) => async (dispatch) => {
  dispatch({ type: BUS_SEAT_SELECTION_REQUEST });

  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/api/seats/select`,
      {
        busNumber,
        seatNumbers: Seats.map(s => s.seatNumber)
      }
    );
      console.log("Seat selection response:", data);

    dispatch({
      type: BUS_SEAT_SELECTION_SUCCESS,
      payload: data   
    });

  } catch (error) {
    dispatch({
      type: BUS_SEAT_SELECTION_FAIL,
      payload: error.response.data || error.message
    });
  }
};


export const getSeatsByBus = (busNumber) => async (dispatch) => {
  dispatch({ type: BUS_SEAT_FETCH_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/seats/bus/${busNumber}`
    );
    console.log("===", data);
    
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

