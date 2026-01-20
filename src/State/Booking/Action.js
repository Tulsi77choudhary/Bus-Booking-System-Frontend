import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  GET_BOOKING_REQUEST,
  GET_BOOKING_SUCCESS,
  GET_BOOKING_FAIL
} from "./ActionType";

export const getBookingById = (id) => async (dispatch) => {
  dispatch({ type: GET_BOOKING_REQUEST });

  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/bookings/${id}`
    );

    dispatch({
      type: GET_BOOKING_SUCCESS,
      payload: data
    });

    console.log("mdkd",data);
    
  } catch (error) {
    dispatch({
      type: GET_BOOKING_FAIL,
      payload: error.response?.data?.message || error.message
    });
  }
};
