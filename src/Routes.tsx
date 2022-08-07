import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import DashboardLayout from "./pages/dashboard";
import RouteNames from "./RouteNames";

import Main from "./pages/main";
import Employees from "./pages/employees";
import EmployeesDetele from "./pages/employeesDelete";


const mainRoute = {
  path: RouteNames.main,
  name: "Main",
  component: Main,
};

const employeesRoute = {
  path: RouteNames.employees,
  name: RouteNames.employeesTittle,
  component: Employees,
};

const deletedEmployeesRoute = {
  path: RouteNames.deletedEmployees,
  name: "Soft Deleted employees",
  component: EmployeesDetele,
};

const dashboardRoutes: any = [mainRoute, employeesRoute, deletedEmployeesRoute];

/**
 * childRoutes is used to create each route
 *
 * @param Layout is the layout of the page
 * @param routes is the list of routes 
 */
const childRoutes = (Layout: any, routes: any): any => {
  return routes.map((route: any, index: number) => {
    const { path, component: Component, name } = route;
    return (
      <Route
        key={index}
        path={path}
        exact
        render={(props: any) => (
          <Layout>
            <Component {...props} name={name} />
          </Layout>
        )}
      />
    );
  });
};

// Routes configuration
const Routes = () => {
  return (
    <Router>
      <Switch>
        {childRoutes(DashboardLayout, dashboardRoutes)}
        <Route
            render={() => {
              return <Redirect from="/" to="/main" />
            }}
          />
      </Switch>
    </Router>
  );
};

export default Routes;
