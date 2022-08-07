import * as types from "../actions/actionTypes";
import initialState from "./initialState";

/**
 * employeesReducer is employees reducer
 *
 * @param state is used to get state
 * @param action is the action to execute
 */
export function employeesReducer(state = initialState.employeesData, action: any) {
  switch (action.type) {
    case types.GET_EMPLOYEE_DETAILS:
      return { ...state, loading: true };
    case types.GET_EMPLOYEES_DETAILS_SUCCESS:
      return { ...state, data: action.employeesData, loading: false };
    case types.GET_EMPLOYEES_DETAILS_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return state;
  }
}

/**
 * SoftDelEmpsReducer is the soft deleted employees reducer
 *
 * @param state is used to get state
 * @param action is the action to execute
 * */
export function SoftDelEmpsReducer(state = initialState.softDelEmpsData, action: any) {
    switch (action.type) {
      case types.GET_SOFT_DELETED_EMPS:
        return { ...state, loading: true };
      case types.GET_SOFT_DELETED_EMPS_SUCCESS:
        return { ...state, data: action.employeesData, loading: false };
      case types.GET_SOFT_DELETED_EMPS_ERROR:
        return { ...state, error: action.error, loading: false };
      default:
        return state;
    }
  }
