import { Box, Button, IconButton, Paper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditIcon from "@mui/icons-material/Edit";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  getEmployeeDetails,
  getSoftDeletedEmps,
} from "./redux/actions/employeeActions";
import {
  fetchWithAxios,
  isValidArray,
  isValidObject,
  isValidString,
} from "./utils/utils";
import AddEmployee from "./addEmployee";
import PositionedSnackbar from "./common/snackbar";
import CommonTable from "./common/commonTable";

function Employees() {
  const dispatch = useDispatch();
  const [empData, setEmpData]: any = useState({});
  const employeesData = useSelector((store: any) => store.employeesData.data);
  const employeesDataLoading = useSelector(
    (store: any) => store.employeesData.loading
  );
  const [empSubmiting, setEmpSubmiting] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empCount, setEmpCount] = useState(0);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [currentEmpData, setCurrentEmpData]: any = useState(undefined);
  const [openSnack, setOpenSnack] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [severity, setSeverity] = useState("success");

  useEffect(() => {
    if (!isValidObject(employeesData)) {
      dispatch(getEmployeeDetails());
    }
  }, []);

  useEffect(() => {
    if (
      isValidObject(employeesData) &&
      employeesData.employees &&
      employeesData.count
    ) {
      //not giving proper count from API
      // setEmpCount(employeesData.count);
      setEmpCount(employeesData.employees.length);
      setEmpData(employeesData.employees);
    }
  }, [employeesData]);

  /**
   * postEmployeesData is a synchronous function which creates/update of an employee
   *
   * @param obj will have employee object to create/update an employee.
   */
  const postEmployeesData = async (obj: any) => {
    const url = `http://142.132.229.249:3000/employees${
      obj._id ? "/" + obj._id : ""
    }`;
    const fnlVals = JSON.stringify(obj, null, 2);
    await fetchWithAxios(url, obj._id ? "PATCH" : "POST", fnlVals)
      .then((employees: any) => {
        if (isValidObject(employees)) {
          setOpenSnack(true);
          setSeverity("success");
          let snakMsg = "";
          if (obj._id) {
            snakMsg = `${obj.name} updated successfully`;
          } else {
            snakMsg = `${obj.name} created successfully`;
          }
          setSnackMsg(snakMsg);
          hideAddEmployee();
          setCurrentEmpData(undefined);
          dispatch(getEmployeeDetails());
        }
      })
      .catch((error: any) => {
        let snakErrMsg = "";
        if (isValidObject(error) && error?.response?.data) {
          const err = error.response.data.message;
          if (isValidString(err)) {
            snakErrMsg = err;
          } else if (isValidArray(err)) {
            err.forEach((msg: string) => {
              snakErrMsg += msg + ",  ";
            });
          }
          setOpenSnack(true);
          setSeverity("error");
          setSnackMsg(snakErrMsg);
        }
      });
  };

  /**
   * handleChangePage is used to change page count
   *
   * @param event will give current html event.
   * @param newPage will have new age number.
   */
  const handleChangePage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  /**
   * handleChangeRowsPerPage is used to change rows per page count
   *
   * @param event will give current html event.
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const empHearder = [
    "Name",
    "Email",
    "Phone",
    "Date Of Birth",
    "Date Of Employeement",
    "Action",
  ];

  /**
   * deleteEmp is a synchronous function which soft deletes an employee
   *
   * @param id will have id of an employee.
   */
  const deleteEmp = async (id: string) => {
    const url = `http://142.132.229.249:3000/employees/soft-delete/${id}`;
    setEmpSubmiting(true);
    await fetchWithAxios(url, "DELETE")
      .then((employees: any) => {
        setEmpSubmiting(false);
        if (isValidObject(employees)) {
          setOpenSnack(true);
          setSnackMsg(`Employee Deleted successfully`);
          setSeverity("success");
          dispatch(getEmployeeDetails());
          dispatch(getSoftDeletedEmps());
        }
      })
      .catch((error: any) => {
        setEmpSubmiting(false);
        let snakErrMsg = "";
        if (isValidObject(error) && error?.response?.data) {
          const err = error.response.data.message;
          if (isValidString(err)) {
            snakErrMsg = err;
          } else if (isValidArray(err)) {
            err.forEach((msg: string) => {
              snakErrMsg += msg + ",  ";
            });
          }
          setOpenSnack(true);
          setSeverity("error");
          setSnackMsg(snakErrMsg);
        }
      });
  };

  /**
   * showActions is gives custom actions to the table
   *
   * @param row will give current row data.
   */
  const showActions = (row: any) => {
    return (
      <>
        <Button
          className="p-0 action-icons"
          onClick={() => {
            setShowAddEmployee(true);
            setCurrentEmpData(row);
          }}
        >
          <EditIcon className="" />
        </Button>
        <Button
          color="error"
          onClick={() => {
            if (isValidObject(row) && isValidString(row._id)) {
              deleteEmp(row._id);
            }
          }}
          className="p-0 action-icons"
        >
          <DeleteSharpIcon className="" />
        </Button>
      </>
    );
  };

  /**
   * AddEmployeeFn will add employee form
   *
   */
  const AddEmployeeFn = () => {
    setShowAddEmployee(true);
  };

  /**
   * hideAddEmployee will hide add employee form
   *
   */
  const hideAddEmployee = () => {
    setShowAddEmployee(false);
  };

  /**
   * refreshEmps will refresh employee table
   *
   */
  const refreshEmps = () => {
    dispatch(getEmployeeDetails());
  };

  return (
    <Box component={Paper} elevation={3} className="employees">
      {showAddEmployee && (
        <Box component={Paper} elevation={6} className="add-employee-div">
          <AddEmployee
            hideAddEmployee={hideAddEmployee}
            currentEmpData={currentEmpData}
            postEmployeesData={postEmployeesData}
            setCurrentEmpData={setCurrentEmpData}
          />
        </Box>
      )}
      {!showAddEmployee && (
        <>
          <Tooltip title="Add Employee" placement="top" arrow>
            <Button color="primary" onClick={AddEmployeeFn} className="mb-2">
              Add Employee
            </Button>
          </Tooltip>
          <Tooltip title="Refresh Employees" placement="top" arrow>
            <IconButton
              onClick={refreshEmps}
              aria-label="Refresh Employees"
              color="primary"
              className="mb-2 float-right"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      <CommonTable
        empHearder={empHearder}
        employeesDataLoading={employeesDataLoading}
        empSubmiting={empSubmiting}
        empData={empData}
        rowsPerPage={rowsPerPage}
        page={page}
        showActions={showActions}
        empCount={empCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <PositionedSnackbar
        openSnack={openSnack}
        snackMsg={snackMsg}
        setOpenSnack={setOpenSnack}
        severity={severity}
      />
    </Box>
  );
}

export default Employees;
