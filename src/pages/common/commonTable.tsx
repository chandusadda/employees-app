import {
  Box,
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { isValidArray } from "../utils/utils";

/**
 * StyledTableCell is gives custom table cell
 *
 * @param theme to pass theme selected
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

/**
 * StyledTableRow is gives custom table row
 *
 * @param theme to pass theme selected
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

/**
 * TablePaginationActionsProps is gives custom table pagination actions
 *
 * @param props to pass Table Pagination Actions Props
 */
function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  /**
   * handleFirstPageButtonClick is used to go to first page directly
   *
   * @param event will give current html event.
   */
  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onPageChange(event, 0);
  };

  /**
   * handleBackButtonClick is used to go to previous page
   *
   * @param event will give current html event.
   */
  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onPageChange(event, page - 1);
  };

  /**
   * handleNextButtonClick is used to go to next page
   *
   * @param event will give current html event.
   */
  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onPageChange(event, page + 1);
  };

  /**
   * handleLastPageButtonClick is used to go to last page directly
   *
   * @param event will give current html event.
   */
  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const CommonTable = (props: any): JSX.Element => {
  const {
    empHearder,
    employeesDataLoading,
    empSubmiting,
    empData,
    rowsPerPage,
    page,
    showActions,
    empCount,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="table">
        <TableHead>
          <TableRow>
            {empHearder.map((emp: string, key: number) => {
              return <StyledTableCell key={emp + key}>{emp}</StyledTableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {employeesDataLoading || empSubmiting ? (
            <StyledTableCell className="text-center" colSpan={6}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </StyledTableCell>
          ) : isValidArray(empData) ? (
            (rowsPerPage > 0
              ? empData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : empData
            ).map((row: any, key: number) => (
              <StyledTableRow key={row.name + key}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                <StyledTableCell>{row.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{row.dateOfEmployment}</StyledTableCell>
                {showActions && (
                  <StyledTableCell>{showActions(row)}</StyledTableCell>
                )}
              </StyledTableRow>
            ))
          ) : (
            <StyledTableCell
              className="text-center"
              colSpan={empHearder.length}
            >
              {"No Data Found"}
            </StyledTableCell>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={employeesDataLoading || empSubmiting ? 0 : empCount}
              rowsPerPage={rowsPerPage}
              page={employeesDataLoading || empSubmiting ? 0 : page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CommonTable;
