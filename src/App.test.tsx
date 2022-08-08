import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("Testing UI elemnts from APP level", () => {
  test("renders Terms of Use from footer", () => {
    render(<App />);
    const linkElement = screen.getByText(/Terms of Use/i);

    expect(linkElement).toBeInTheDocument();
  });

  test("Testing Employee table rendered when employee button clicked on navbar", () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const navToEmpBtn = getByTestId("nav-to-employees");
    const empCompId = "emp-main-div";
    expect(navToEmpBtn).toBeInTheDocument();
    expect(queryByTestId(empCompId)).toBeNull();
    fireEvent.click(navToEmpBtn);
    expect(queryByTestId(empCompId)).toBeDefined();
  });

  test("Testing Main page rendered when logo button clicked on navbar", () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const navToMainBtn = getByTestId("nav-to-main");
    const mainCompId = "app-main-div";
    expect(navToMainBtn).toBeInTheDocument();
    expect(queryByTestId(mainCompId)).toBeNull();
    fireEvent.click(navToMainBtn);
    expect(queryByTestId(mainCompId)).toBeDefined();
  });

  test("Testing Soft Deleted Employee table rendered when delete employee button clicked on navbar", () => {
    const { getByTestId, queryByTestId } = render(<App />);
    const navToDelEmpBtn = getByTestId("nav-to-delEmployees");
    const delEmpCompId = "del-emp-div";
    expect(navToDelEmpBtn).toBeInTheDocument();
    expect(queryByTestId(delEmpCompId)).toBeNull();
    fireEvent.click(navToDelEmpBtn);
    expect(queryByTestId(delEmpCompId)).toBeDefined();
  });
});
