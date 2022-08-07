import * as types from "./actionTypes";

// getEmployeeDetails is the action to get employees
export const getEmployeeDetails = () => ({
  type: types.GET_EMPLOYEE_DETAILS,
});

// getEmployeesSuccess is the action to get employees success
export const getEmployeesSuccess = (employees: any) => ({
  type: types.GET_EMPLOYEES_DETAILS_SUCCESS,
  employees,
});

// getSoftDeletedEmps is the action to get soft deleted employees
export const getSoftDeletedEmps = () => ({
  type: types.GET_SOFT_DELETED_EMPS,
});

// getSoftDeletedEmpsSuccess is the action to get soft deleted employees success
export const getSoftDeletedEmpsSuccess = (employees: any) => ({
  type: types.GET_SOFT_DELETED_EMPS_SUCCESS,
  employees,
});
