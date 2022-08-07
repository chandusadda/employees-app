import { Box, IconButton, Paper, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefreshIcon from "@mui/icons-material/Refresh";

import { getSoftDeletedEmps } from "./redux/actions/employeeActions";
import { isValidObject } from "./utils/utils";
import CommonTable from "./common/commonTable";

function SoftDeleteEmployees() {
  const dispatch = useDispatch();
  const [empData, setEmpData]: any = useState({});
  const softDelEmpsData = useSelector(
    (store: any) => store.softDelEmpsData.data
  );
  const softDelEmpsDataLoading = useSelector(
    (store: any) => store.softDelEmpsData.loading
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empCount, setEmpCount] = useState(0);

  /**
   * handleChangePage is used to change page count
   *
   * @param event will give current html event.
   * @param newPage will have new age number.
   */
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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

  useEffect(() => {
    if (!isValidObject(softDelEmpsData)) {
      dispatch(getSoftDeletedEmps());
    }
  }, []);

  useEffect(() => {
    if (
      isValidObject(softDelEmpsData) &&
      softDelEmpsData.employees &&
      softDelEmpsData.count
    ) {
      //not giving proper count from API
      // setEmpCount(softDelEmpsData.count);
      setEmpCount(softDelEmpsData.employees.length);
      setEmpData(softDelEmpsData.employees);
    }
  }, [softDelEmpsData]);

  const empHearder = [
    "Name",
    "Email",
    "Phone",
    "Date Of Birth",
    "Date Of Employeement",
  ];

  /**
   * refreshDelEmps will refresh soft delete employee table
   *
   */
  const refreshDelEmps = () => {
    dispatch(getSoftDeletedEmps());
  };

  return (
    <Box component={Paper} elevation={3} className="employees">
      <Tooltip title="Refresh Soft Deleted Employees" placement="top" arrow>
        <IconButton
          onClick={refreshDelEmps}
          aria-label="Refresh Soft Deleted Employees"
          color="primary"
          className="mb-2 float-right"
        >
          <RefreshIcon />
        </IconButton>
      </Tooltip>
      <CommonTable
        empHearder={empHearder}
        employeesDataLoading={softDelEmpsDataLoading}
        empData={empData}
        rowsPerPage={rowsPerPage}
        page={page}
        empCount={empCount}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default SoftDeleteEmployees;
