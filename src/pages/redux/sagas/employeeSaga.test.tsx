import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { takeLatest } from "redux-saga/effects";
import * as types from "../actions/actionTypes";
import { call, put } from "redux-saga/effects";
import axios from "axios";
import { runSaga } from "redux-saga";
import { baseUrl } from "./employesSaga";
import {
  getEmployeeDetails,
  getEmployeesSuccess,
  getSoftDeletedEmps,
  getSoftDeletedEmpsSuccess,
} from "../actions/employeeActions";
import { empsStruct, empStruct } from "../../common/types";

const empData: empStruct = {
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

const empsData: empsStruct = {
  count: 1,
  employees: {
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
  },
};

const empslimitData: any = {
  count: 3,
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
      name: "hamzah1",
      phoneNumber: "+3811234567890",
      _id: "62efdde23309d19af6e7becb",
    },
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
      name: "hamzah2",
      phoneNumber: "+3811234567890",
      _id: "62efdde23309d19af6e7becb",
    },
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
      name: "hamzah2",
      phoneNumber: "+3811234567890",
      _id: "62efdde23309d19af6e7becb",
    },
  ],
};

jest.mock("axios");
jest.setTimeout(10000);
const mockedAxios = axios as jest.Mocked<typeof axios>;

function* makeFetchEmpsRequest() {
  try {
    // dispatch loading action
    yield put(getEmployeeDetails());
    // call api
    const data = yield call(axios.get, baseUrl + "/employees");
    yield put(getEmployeesSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

function* makeFetchLimitEmpsRequest() {
  try {
    // dispatch loading action
    yield put(getEmployeeDetails());
    // call api
    const data = yield call(axios.get, baseUrl + "/employees");
    // return only first 2 employees from response
    data.data.count = 2;
    data.data.employees = data.data.employees.filter((emp, index) => {
      if (index < 2) {
        return emp;
      }
    });
    yield put(getEmployeesSuccess(data));
  } catch (error) {
    yield put({
      type: types.GET_EMPLOYEES_DETAILS_ERROR,
      error: error,
    });
  }
}

describe("Sagas Empolyees List", () => {
  it("should test makeFetchEmpsRequest saga", async () => {
    mockedAxios.get.mockResolvedValue({ data: empsData });
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchEmpsRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("GET_EMPLOYEE_DETAILS");

    expect(dispatched[1].type).toEqual("GET_EMPLOYEES_DETAILS_SUCCESS");
    expect(dispatched[1].employees.data).toEqual(empsData);
  });

  it("should test makeFetchLimitEmpsRequest to get 2 employees only saga", async () => {
    mockedAxios.get.mockResolvedValue({ data: empslimitData });
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchLimitEmpsRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("GET_EMPLOYEE_DETAILS");
    expect(dispatched[1].type).toEqual("GET_EMPLOYEES_DETAILS_SUCCESS");
    expect(dispatched[1].employees.data.count).toEqual(2);
    expect(dispatched[1].employees.data.employees.length).toEqual(2);
  });

  it("should test makeFetchLimitEmpsRequest through error saga", async () => {
    const error = new Error();
    mockedAxios.get.mockRejectedValue([
      { data: empslimitData },
      throwError(error),
    ]);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchLimitEmpsRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("GET_EMPLOYEE_DETAILS");
    expect(dispatched[1].type).toEqual("GET_EMPLOYEES_DETAILS_ERROR");
  });
});

function* makeFetchDelEmpsRequest() {
  try {
    // dispatch loading action
    yield put(getSoftDeletedEmps());
    // call api
    const data = yield call(axios.get, baseUrl + "/employees/deleted");
    // return only first 5 todos from response
    yield put(getSoftDeletedEmpsSuccess(data));
  } catch (error) {
    console.error(error);
  }
}

function* makeFetchLimitDelEmpsRequest() {
  try {
    // dispatch loading action
    yield put(getSoftDeletedEmps());
    // call api
    const data = yield call(axios.get, baseUrl + "/employees/deleted");
    // return only first 2 soft deleted employees from response
    data.data.count = 2;
    data.data.employees = data.data.employees.filter((emp, index) => {
      if (index < 2) {
        return emp;
      }
    });
    yield put(getSoftDeletedEmpsSuccess(data));
  } catch (error) {
    yield put({
      type: types.GET_SOFT_DELETED_EMPS_ERROR,
      error: error,
    });
  }
}

describe("Sagas Soft Deleted Empolyees List", () => {
  it("should test makeFetchDelEmpsRequest saga", async () => {
    mockedAxios.get.mockResolvedValue({ data: empsData });
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchDelEmpsRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("GET_SOFT_DELETED_EMPS");
    expect(dispatched[1].type).toEqual("GET_SOFT_DELETED_EMPS_SUCCESS");
    expect(dispatched[1].employees.data).toEqual(empsData);
  });

  it("should test makeFetchLimitDelEmpsRequest to get 2 employees only saga", async () => {
    mockedAxios.get.mockResolvedValue({ data: empslimitData });
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchLimitDelEmpsRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("GET_SOFT_DELETED_EMPS");
    expect(dispatched[1].type).toEqual("GET_SOFT_DELETED_EMPS_SUCCESS");
    expect(dispatched[1].employees.data.count).toEqual(2);
    expect(dispatched[1].employees.data.employees.length).toEqual(2);
  });

  it("should test makeFetchLimitDelEmpsRequest through error saga", async () => {
    const error = new Error();
    mockedAxios.get.mockRejectedValue([
      { data: empslimitData },
      throwError(error),
    ]);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      makeFetchLimitDelEmpsRequest
    ).toPromise();

    expect(dispatched[0].type).toEqual("GET_SOFT_DELETED_EMPS");
    expect(dispatched[1].type).toEqual("GET_SOFT_DELETED_EMPS_ERROR");
  });
});
