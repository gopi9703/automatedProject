import React from "react";
import { Outlet } from "react-router-dom";
import AdministratorSidebar from "./SideBar";
interface AdministationProps {}

const Administation: React.FunctionComponent<AdministationProps> = () => {
  return (
    <>
      <div className="flex flex-row h-full">
        <AdministratorSidebar />
        <div className="bg-white border-l border-gray-200 sidebar-content-layout px-5 py-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Administation;
