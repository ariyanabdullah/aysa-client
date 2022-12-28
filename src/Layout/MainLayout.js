import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "../Shared/Footer/Footer";
import Header from "../Shared/Header/Header";
import Sidebar from "../Shared/Sidebar/Sidebar";

const MainLayout = () => {
  return (
    <div>
      <Header></Header>

      <div className="bg-[#f3f4f6]">
        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex-col items-center justify-center">
            <Outlet></Outlet>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 bg-[#2b0383] dark:text-white">
              <Sidebar></Sidebar>
            </ul>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
