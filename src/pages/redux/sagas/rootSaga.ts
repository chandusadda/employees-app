import { all } from "redux-saga/effects";

import { employeeActionWatcher, softDelEmpsActionWatcher } from "./employesSaga";

export default function* rootSaga() {
  yield all([
    employeeActionWatcher(),
    softDelEmpsActionWatcher()
  ]);
}
