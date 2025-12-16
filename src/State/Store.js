
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Action/Reducer";
import { busReducer } from "./Buses/Reduce";

const rootReducers = combineReducers({
  auth: authReducer,
  bus: busReducer,
  
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));




