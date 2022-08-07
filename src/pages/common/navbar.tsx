import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import logo from "../../logo.svg";
import { useHistory, Link } from "react-router-dom";
import RouteNames from "../../RouteNames";

const NavbarComponent = () => {
  const history = useHistory();

  // navigate to main page
  const navigateToPage = (): void => {
    history.push({
      pathname: `/${RouteNames.main}`,
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="nav-main">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              color="inherit"
              component="h1"
              className="flex-grow-1"
            >
              <Button
                component={Link}
                to={RouteNames.main}
              >
                <img onClick={navigateToPage} src={logo} className="App-logo" alt="logo" />
              </Button>
              <Button
                className="nav-btns"
                component={Link}
                to={RouteNames.employees}
              >
                {RouteNames.employeesTittle}
              </Button>
              <Button
                className="nav-btns"
                component={Link}
                to={RouteNames.deletedEmployees}
              >
                {RouteNames.employeesDelete}
              </Button>{" "}
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              edge="end"
            >
              <AccountCircle />
            </IconButton>
            <p className="ml-1">Profile</p>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavbarComponent;
