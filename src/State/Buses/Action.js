import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

import {
  BUS_SEARCH_REQUEST,
  BUS_SEARCH_SUCCESS,
  BUS_SEARCH_FAIL,
} from "./ActionType";


export const getAllBuses = (from, to, date) => async (dispatch) => {
  dispatch({ type: BUS_SEARCH_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/buses?from=${from}&to=${to}&date=${date}`);
    const buses = response.data;

    dispatch({ type: BUS_SEARCH_SUCCESS, payload: buses });
    console.log("Fetched buses:", buses);

    return response.data;
  } catch (error) {
    console.error("Error fetching buses:", error);
    dispatch({ type: BUS_SEARCH_FAIL, payload: error.response?.data || error.message });
    throw error;
  }
};

// -------------------- BUS SEARCH --------------------------
export const searchBuses = (searchData) => async (dispatch) => {
  dispatch({ type: BUS_SEARCH_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/api/buses/search`, searchData);
    const buses = response.data;

    dispatch({ type: BUS_SEARCH_SUCCESS, payload: buses });
    console.log("Searched bus:", buses);
  } catch (error) {
    dispatch({ type: BUS_SEARCH_FAIL, payload: error.response?.data || error.message });
  }
};

