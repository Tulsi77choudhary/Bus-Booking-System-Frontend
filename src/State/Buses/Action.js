import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";

import {
  BUS_SEARCH_REQUEST,
  BUS_SEARCH_SUCCESS,
  BUS_SEARCH_FAIL,
} from "./ActionType";


export const getAllBuses = () => async (dispatch) => {
  dispatch({ type: BUS_SEARCH_REQUEST });
  try {
    const token = localStorage.getItem("jwt");

    const response = await axios.get(`${API_BASE_URL}/api/buses`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    dispatch({ type: BUS_SEARCH_SUCCESS, payload: response.data });

    return response.data;
  } catch (error) {
    dispatch({ 
      type: BUS_SEARCH_FAIL,
      payload: error.response?.data || error.message 
    });
    
  }
};

// -------------------- BUS SEARCH --------------------------
export const searchBuses = (searchData) => async (dispatch) => {
  dispatch({ type: BUS_SEARCH_REQUEST });
  try {
    const token = localStorage.getItem("jwt");

    const response = await axios.post(`${API_BASE_URL}/api/buses/search`, searchData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const buses = response.data;

    dispatch({ type: BUS_SEARCH_SUCCESS, payload: buses });
    console.log("Searched bus:", buses);
  } catch (error) {
    dispatch({ 
      type: BUS_SEARCH_FAIL, 
      payload: error.response?.data || error.message 
    });
  }
};

