import { empsStruct } from "../../common/types";
import * as types from "./actionTypes";

interface getEmpsStruct {
  type: string
}

interface getEmpsSuccStruct {
  type: string,
  employees: empsStruct
}

// getEmployeeDetails is the action to get employees
export const getEmployeeDetails = (): getEmpsStruct => ({
  type: types.GET_EMPLOYEE_DETAILS,
});

// getEmployeesSuccess is the action to get employees success
export const getEmployeesSuccess = (employees: empsStruct): getEmpsSuccStruct => ({
  type: types.GET_EMPLOYEES_DETAILS_SUCCESS,
  employees,
});

// getSoftDeletedEmps is the action to get soft deleted employees
export const getSoftDeletedEmps = (): getEmpsStruct => ({
  type: types.GET_SOFT_DELETED_EMPS,
});

// getSoftDeletedEmpsSuccess is the action to get soft deleted employees success
export const getSoftDeletedEmpsSuccess = (employees: empsStruct): getEmpsSuccStruct => ({
  type: types.GET_SOFT_DELETED_EMPS_SUCCESS,
  employees,
});
