import { put, takeLatest } from "redux-saga/effects";
import { fetchWithAxios } from "../../utils/utils";
import * as types from "../actions/actionTypes";

export const baseUrl = "http://142.132.229.249:3000";

//employeeInfo get employees list
export function* employeeInfo() {
  const url = baseUrl+"/employees"
  try {
    const employeesData: Promise<any> = yield fetchWithAxios(url, "GET");
    yield put({
      type: types.GET_EMPLOYEES_DETAILS_SUCCESS,
      employeesData: employeesData,
    });
  } catch (e) {
    yield put({
      type: types.GET_EMPLOYEES_DETAILS_ERROR,
      error: e,
    });
  }
}

//employeeActionWatcher employees action watcher
export function* employeeActionWatcher() {
  yield takeLatest(types.GET_EMPLOYEE_DETAILS, employeeInfo);
}

//softDelEmpsInfo get soft deleted employees list
export function* softDelEmpsInfo() {
  const url = baseUrl+"/employees/deleted"
  try {
    const employeesData: Promise<any> = yield fetchWithAxios(url, "GET");
    yield put({
      type: types.GET_SOFT_DELETED_EMPS_SUCCESS,
      employeesData: employeesData,
    });
  } catch (e) {
    yield put({
      type: types.GET_SOFT_DELETED_EMPS_ERROR,
      error: e,
    });
  }
}

//softDelEmpsActionWatcher soft deleted employees action watcher
export function* softDelEmpsActionWatcher() {
  yield takeLatest(types.GET_SOFT_DELETED_EMPS, softDelEmpsInfo);
}