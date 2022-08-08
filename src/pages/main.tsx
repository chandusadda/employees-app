import RouteNames from "../RouteNames";
import PageCard from "./common/pageCard";

function Main(): JSX.Element {
  return (
    <div className="Main" data-testid="app-main-div">
      <PageCard
        toLink={RouteNames.employees}
        name={RouteNames.employeesTittle}
        description="View complete Employees list, can do actions like add/delete/update employee"
      />
      <PageCard
        toLink={RouteNames.deletedEmployees}
        name={RouteNames.employeesDelete}
        description="View complete Soft Deleted Employees list"
      />
    </div>
  );
}

export default Main;
