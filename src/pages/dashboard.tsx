import Navbar from "./common/navbar";
import Footer from "./common/footer";
import { mainStruct } from "./common/types";

/**
 * Main is used to create main layout of the page
 *
 * @param className is the class to be added to it
 * @param children is the child component to render
 */
const Main = ({ className, children }: mainStruct): JSX.Element => (
  <div className={`page-main ${className ? className : ""}`}>{children}</div>
);

/**
 * Dashboard is main landing page
 *
 * @param children is the child component to render
 */
const Dashboard = ({ children }: mainStruct): JSX.Element => (
  <>
    <div className={"wrapper "}>
      <Main className={""}>
        <Navbar />
        <div className="content">{children}</div>
        <Footer />
      </Main>
    </div>
  </>
);

export default Dashboard;
