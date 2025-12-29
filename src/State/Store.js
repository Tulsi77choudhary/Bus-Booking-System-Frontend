
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Action/Reducer";
import { busReducer } from "./Buses/Reduce";
import { seatReducer } from "./Seats/Reduce";

const rootReducers = combineReducers({
  auth: authReducer,
  bus: busReducer,
  seat: seatReducer,
  
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));






