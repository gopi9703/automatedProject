/* eslint-disable no-undef */
import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center loader-view">
        <ProgressSpinner style={{ width: "50px", height: "50px" }} />
      </div>
    </>
  );
};

export default Loader;
