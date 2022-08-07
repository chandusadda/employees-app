import { combineReducers } from "redux";
import {
  employeesReducer as employeesData,
  SoftDelEmpsReducer as softDelEmpsData,
} from "./employeesReducer";

export default combineReducers({
  employeesData,
  softDelEmpsData
});
