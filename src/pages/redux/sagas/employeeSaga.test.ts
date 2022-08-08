
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { call, put } from "redux-saga/effects";

const employeeData = {
  data: {
    count: 1,
    employees: [
      {
        dateOfBirth: "2022-08-22",
        dateOfEmployment: "2022-08-11",
        email: "hamzah.i.hamad@gmail.com",
        homeAddress: {
          addressLine2: "dfgdfg",
          addressLine1: "fdgdfgdf",
          ZIPCode: "21101",
          city: "dfgdfg",
        },
        name: "hamzah",
        phoneNumber: "+3811234567890",
        _id: "62efdde23309d19af6e7becb",
      },
    ],
  },
  error: {},
  loading: false,
};

const empData = {
  dateOfBirth: "2022-08-22",
  dateOfEmployment: "2022-08-11",
  email: "hamzah.i.hamad@gmail.com",
  homeAddress: {
    addressLine2: "dfgdfg",
    addressLine1: "fdgdfgdf",
    ZIPCode: "21101",
    city: "dfgdfg",
  },
  name: "hamzah1",
  phoneNumber: "+3811234567890",
  _id: "62efdde23309d19af6e7becb",
};

const actionTypes = {
  getEmpsSuccess(emps) {
    return { type: types.GET_EMPLOYEES_DETAILS_SUCCESS, payload: { emps } };
  },
  getEmpsFailure(error) {
    return { type: types.GET_EMPLOYEES_DETAILS_ERROR, error };
  },
  updateEmpsSuccess(emps) {
    return { type: types.UPDATE_EMPLOYEES_DETAILS_SUCCESS, payload: { emps } };
  },
  updateEmpsFailure(error) {
    return { type: types.UPDATE_EMPLOYEES_DETAILS_ERROR, error };
  },
};

export function* getEmps() {
  try {
    const emps = yield call(api.emps.getEmps);
    yield put(actionTypes.getEmpsSuccess(emps));
  } catch (error) {
    yield put(actionTypes.getEmpsFailure(error));
  }
}

export function* watchEmps() {
  yield takeLatest(types.GET_EMPLOYEE_DETAILS, getEmps);
}
export function* updateEmps() {
    try {
      const emps = yield call(api.emps.updateEmps);
      yield put(actionTypes.updateEmpsSuccess(emps));
    } catch (error) {
      yield put(actionTypes.updateEmpsFailure(error));
    }
  }

export function* watchUpEmps() {
    yield takeLatest(types.UPDATE_EMPLOYEE_DETAILS, getEmps);
  }

export const api = {
  emps: {
    async getEmps() {
      return employeeData;
    },
    async updateEmps() {
      return empData;
    },
  },
};

describe("Check Employes Get data", () => {
  it("Test for fetchs Employees failure ", () => {
    const error = new Error();
    return expectSaga(getEmps)
      .provide([[call(api.emps.getEmps), throwError(error)]])
      .put({ type: types.GET_EMPLOYEES_DETAILS_ERROR, error: error })
      .run();
  });

  it("Test for employees success", () => {
    const emps = { emps: employeeData };
    return expectSaga(watchEmps)
      .provide([[call(api.emps.getEmps), emps]])
      .put({ type: types.GET_EMPLOYEES_DETAILS_SUCCESS, payload: { emps } })
      .dispatch({ type: types.GET_EMPLOYEE_DETAILS })
      .silentRun();
  });
});

describe("Check update Employee data", () => {
  it("Test for fetchs update Employee failure ", () => {
    const error = new Error();
    return expectSaga(updateEmps)
      .provide([[call(api.emps.updateEmps), throwError(error)]])
      .put({ type: types.UPDATE_EMPLOYEES_DETAILS_ERROR, error: error })
      .run();
  });

  it("Test for update employee success", () => {
    const emps = { emps: empData };
    return expectSaga(watchUpEmps)
      .provide([[call(api.emps.updateEmps), emps]])
      .put({ type: types.UPDATE_EMPLOYEES_DETAILS_SUCCESS, payload: { emps } })
      .dispatch({ type: types.UPDATE_EMPLOYEE_DETAILS })
      .silentRun();
  });
});
