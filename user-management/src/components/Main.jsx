import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Main;
