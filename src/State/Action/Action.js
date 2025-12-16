import axios from "axios";
import { API_BASE_URL } from "../../config/apiConfig";
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS,
} from "./ActionType";

// -------------------- REGISTER --------------------------
export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }

    dispatch({ type: REGISTER_SUCCESS, payload: user });
    console.log("Registered user:", user);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error.response?.data || error.message });
  }
};

// -------------------- LOGIN --------------------
export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, userData);
    const { token, user } = response.data;
    console.log("user",token,user);
    

    if (token && user) {
      localStorage.setItem("jwt", token);
      localStorage.setItem("userId", user.id);
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { email: user.email, token, user, id: user.id },
    });

    console.log("Logged in user:", user);
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data || error.message,
    });
  }
};

