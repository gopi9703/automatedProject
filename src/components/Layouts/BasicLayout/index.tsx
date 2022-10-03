import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <div className="content-wrapper-view">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BasicLayout;
